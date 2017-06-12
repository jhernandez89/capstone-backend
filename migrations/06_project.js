exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', function (table) {
    table.increments();
    table.string('name');
    table.integer('type_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('project')
};
