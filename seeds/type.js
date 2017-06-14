
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('type').del()
    .then(() =>
      // Inserts seed entries
       knex('type').insert([
        { id: 1, type: 'Interview' },
        { id: 2, type: 'Ethnography' },
        { id: 3, type: 'Case Study' },
       ]));
};
