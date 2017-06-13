const express = require('express');
const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('project')
    .select()
    .then((result) => {
      res.json(result);
    });
});

router.post('/', (req, res) => {
  knex('project').insert({

    });
});

module.exports = router;
