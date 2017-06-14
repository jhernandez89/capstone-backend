const express = require('express');
const router = require('express').Router();
const knex = require('../db/knex');
const { merge } = require('ramda');
const { checkIfLoggedIn } = require('../helpers');

router.get('/', checkIfLoggedIn, (req, res) => {
  knex('project')
    .leftJoin('type', 'type.id', '=', 'project.type_id')
    .leftJoin('interview', 'interview.id', '=', 'project.sub_type_id')
    .select('project.id', 'interview_type', 'type', 'project.name')
    .where('username_id', req.session.userId)
    .then(async (projects) => {
      const questionsArray = await Promise.all(projects.map(project =>
        knex('question').where('project_id', project.id)));
      const projectsWithQuestions = projects.reduce((array, project, index) => {
        const projectWithQuestions = merge(project, { questions: questionsArray[index] });
        array.push(projectWithQuestions);
        return array;
      }, []);
      res.json(projectsWithQuestions);
    });
});

router.post('/', checkIfLoggedIn, (req, res) => {
  knex('project').insert({
    name: req.body.projectTitle,
    type_id: req.body.type_id,
    sub_type_id: req.body.sub_type_id,
    username_id: req.session.userId,
  }, 'id')
    .then(([id]) => Promise.all(req.body.questions.map(currentQuestion =>
        knex('question').insert({
          question: currentQuestion,
          project_id: id,
        }))))
    .then(() => res.json({ message: 'Project totally saved!' }))
    .catch((error) => {
    });
});

module.exports = router;
