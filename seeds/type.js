
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('type').del()
    .then(() =>
      // Inserts seed entries
       knex('table_name').insert([
        { id: 1, type: 'Interview' },
        { id: 4, type: 'Ethnography' },
        { id: 5, type: 'Case Study' },
       ]));
};
