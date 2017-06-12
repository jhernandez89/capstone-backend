
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('username').del()
    .then(function () {
      // Inserts seed entries
      return knex('username').insert([
        {email: 'jeffhernandez89@gmail.com', first_name: "jeff", last_name:"hernandez", tip: true, username:"jhizzle"},
      ]);
    });
};
