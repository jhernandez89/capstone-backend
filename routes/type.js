const express = require('express')
const router = require('express').Router();
const knex = require('../db/knex');
//
router.get('/', function(req, res) {
  knex('type')
  .select()
  .then(function (result) {
    res.json(result);
  })
}).debug([enabled]);
//
// router.get('/room/:id', function(req, res) {
//   knex('venue')
//   .select()
//   .where('venue.id', req.params.id)
//   .then(function (result) {
//     res.json(result);
//   })
// })
//
// router.get('/:id', function(req, res) {
//   knex('venue')
//   .select()
//   .where('venue.id', req.params.id)
//   .then(function (result) {
//     res.json(result);
//   })
// })
//
router.post('/', function(req, res){
console.log(req.body);
  knex('type').insert({
    id: req.body.id,
    type: req.body.type,
  }, 'id').then(function(result){
    res.json(result);
  });
});
//
// router.patch('/:id', function(req, res){
//
// knex('venue').where('id', req.params.id).update({
//   name: req.body.name,
//   subject_id: knex('subject').where('name', req.body.subject).select('id'),
// })
// .then(function(result){
//   res.json(result)
//   })
// });
//
// router.delete('/:id', function(req, res){
//
//   knex('venue').where('id', req.params.id).del().then(function(result){
//     res.json(result);
//   });
//
// });
//
module.exports = router;
