import { Knex } from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable('favorites', table => {
        table.increments('id').primary()

        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        table.integer('teacher_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable()
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable("favorites");
}

