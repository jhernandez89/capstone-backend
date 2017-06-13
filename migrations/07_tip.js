exports.up = function(knex, Promise) {
  return knex.schema.createTable('tip', function (table) {
    table.increments();
    table.string('tip');
    table.string('instruction')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tip')
};
