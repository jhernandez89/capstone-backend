exports.up = function(knex, Promise) {
  return knex.schema.createTable('username', function (table) {
    table.increments();
    table.string('email')
    table.string('first_name');
    table.string('last_name');
    table.boolean('tip')
    table.string('username')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('username');
};
