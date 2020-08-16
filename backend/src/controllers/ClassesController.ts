import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  //método para listar aulas
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    //condiçoes para filtrar aulas
    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    //convertendo horas em minutos
    const timeInMinutes = convertHourToMinutes(time);

    //consultando banco de dados com  join, where e whereExists
    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  //método create para criar um novo user, classes e schedules_class
  async create(request: Request, response: Response) {

    //recebendo os dados e desestruturando  
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
  
    const trx = await db.transaction();
  
  
    try {
      //gravando no banco de dados na tabela users
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
  
      //pegando id do usuario gravado no banco de dados
      const user_id = insertedUsersIds[0];
  
      //gravando dados no banco de dados na tabela classes
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });
  
      //pegando id da aula gravada no banco de dados
      const class_id = insertedClassesIds[0];
  
      //preparando conteudo do schedules e convertendo horas em minutos
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      })
  
      //gravando dados no banco de dados na tabela class_schedule
      await trx('class_schedule').insert(classSchedule);
  
      await trx.commit();
      
      return response.status(201).send();
    } catch (err) {
      console.log(err);
      
      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    } 
  }
}