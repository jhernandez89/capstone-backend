exports.up = function(knex, Promise) {
  return knex.schema.createTable('demographic', function (table) {
    table.integer('age');
    table.string('school');
    table.string('gender');
    table.integer('username_id')
      .references('username.id')
      .onDelete('CASCADE');
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('demographic')
};
