import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('email').notNullable().unique()
        table.string('name').notNullable()
        table.string('last_name').notNullable()
        table.string('avatar').defaultTo('')
        table.string('bio').defaultTo('')
        table.string('whatsapp').defaultTo('')
        table.string('password').notNullable()
        table.string('passwordResetToken')
        table.date('passwordResetExpires')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}