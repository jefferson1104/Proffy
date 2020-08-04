import knex from 'knex';
import Knex from 'knex';

//fazendo alterações no banco de dados
export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  });
}

//desfazendo as alterações no banco de dados
export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}