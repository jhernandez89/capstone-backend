
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('interview').del()
    .then(() =>
      // Inserts seed entries
       knex('interview').insert([
        { id: 1, interview_type: 'Unstructured', type_id: 1 },
        { id: 2, interview_type: 'Semi-Structured', type_id: 1 },
        { id: 3, interview_type: 'Structured', type_id: 1 },
        { id: 4, interview_type: 'Participant Observation', type_id: 2 },
       ]));
};
