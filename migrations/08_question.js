exports.up = function(knex, Promise) {
  return knex.schema.createTable('question', function (table) {
    table.integer('id')
    table.string('question');
    table.integer('interview_id')
    table.integer('project_id')
      .references('project.id')
      .onDelete('CASCADE')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('question')
};
