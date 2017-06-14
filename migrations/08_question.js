exports.up = function (knex, Promise) {
  return knex.schema.createTable('question', (table) => {
    table.string('question');
    table.integer('project_id')
      .references('project.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('question');
};
