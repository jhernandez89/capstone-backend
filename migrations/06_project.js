exports.up = function (knex, Promise) {
  return knex.schema.createTable('project', (table) => {
    table.increments();
    table.string('name');
    table.integer('type_id');
    table.integer('sub_type_id');
    table.integer('username_id')
      .references('username.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('project');
};
