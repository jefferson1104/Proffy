import Knex from 'knex';

//fazendo alterações no banco de dados
export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();

    table.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  });
}

//desfazendo as alterações no banco de dados
export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}