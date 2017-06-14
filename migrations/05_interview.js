exports.up = function (knex, Promise) {
  return knex.schema.createTable('interview', (table) => {
    table.integer('id');
    table.string('interview_type');
    table.integer('type_id');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('interview');
};
