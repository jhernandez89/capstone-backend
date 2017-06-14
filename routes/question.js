const express = require('express');
const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('question')
    .select()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log('error', error);
    });
});

router.post('/', (req, res) => {
  knex('question').insert({
    question: req.body.question,
    interview_id: req.body.id,
  });
});

module.exports = router;
