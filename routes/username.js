const express = require('express');
const router = require('express').Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const log4js = require('log4js');

const logger = log4js.getLogger();

// router.get('/', (req, res) => {
//   knex('username')
//   .select()
//   .then((result) => {
//     console.log(result);
//     res.json(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// });

router.get('/', (req, res) => {
  if (req.session.userId) {
    return knex('users')
    .select()
    .where('id', req.params.userId)
    .then(([result]) => {
      res.json(result);
    });
  }
  return res.status(401).send('not logged in');
});

router.get('/:id', (req, res) => {
  knex('username')
  .select()
  .where('username.id', req.params.id)
  .then((result) => {
    res.json(result);
  });
});
// router.get('/', (req, res) => {
//   if (req.session.userId) {
//     return knex('users')
//     .select()
//     .where('id', req.params.userId)
//     .then(([result]) => {
//       res.json(result);
//     });
//   }
//   return res.status(401).send('not logged in');
// });


router.post('/login', (req, res) => {
  knex('username')
  .select('id')
  .where('username.email', req.body.email)
  .then((result) => {
    if (result.length) {
      const [{ id }] = result;
      return knex('password').select('password').where('user_id', id)
      .then((passwordArray) => {
        if (passwordArray.length) {
          const [{ password }] = passwordArray;
          return bcrypt.compare(req.body.password, password)
          .then((validPassword) => {
            if (validPassword) {
              req.session.userId = id;
              return res.status(200).send('ok');
            }
            return res.status(401).send('unauthorized');
          });
        }
        return res.status(401).send('unauthorized');
      });
    }
    return res.status(401).send('unauthorized');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('server error');
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  knex('username').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    tip: req.body.tip,
    username: req.body.username,
  }, 'id')
  .then(([id]) =>
    bcrypt.hash(req.body.password, 10)
    .then(hashPassword =>
      knex('password').insert({
        username_id: id,
        password: hashPassword,
      }))
    .then(() => {
      req.session.userId = id;
    }))
  .then(() => {
    res.status(201).send(req.body);
  })
  .catch((error) => {
    res.status(403).send(error.message);
    logger.error(error);
  });
});

router.patch('/', (req, res) => {
  knex('username').where('id', req.session.userId).update({
    name: req.body.name,
    subject_id: knex('subject').where('name', req.body.subject).select('id'),
  })
  .then((result) => {
    res.json(result);
  });
});

router.delete('/', (req, res) => {
  knex('username').where('id', req.session.userId).del().then((result) => {
    res.json(result);
  });
});

module.exports = router;
