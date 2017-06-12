exports.up = function (knex, Promise) {
  return knex.schema.createTable('password', (table) => {
    table.string('password');
    table.integer('username_id')
      .references('username.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('password');
};
