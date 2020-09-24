exports.up = function (knex) {
  return knex.schema.createTable('projects', table => {
    table.increments('id')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.string('name')
    table.string('description')
    table.date('date_start')
    table.date('date_end')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('projects')
}