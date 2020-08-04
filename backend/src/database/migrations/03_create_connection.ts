import Knex from 'knex';

//fazendo alterações no banco de dados
export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();

    table.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');

    table.timestamp('created_at')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable();
  });
}

//desfazendo as alterações no banco de dados
export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}