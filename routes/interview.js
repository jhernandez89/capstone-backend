const express = require('express');
const router = require('express').Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('interview')
    .select()
    .then((result) => {
      res.json(result);
    });
});

module.exports = router;
