const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const index = require('./routes/index');
const user = require('./routes/username');
const type = require('./routes/type');
const interview = require('./routes/interview');
const project = require('./routes/project');
const question = require('./routes/question');

const logger = log4js.getLogger();
const app = express();

const whitelist = ['http://localhost:4200', 'https://capstone-37823.firebaseapp.com', 'https://researchspiritguide.com'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      logger.error(`Bad Origin ${origin}`);
      callback(new Error(`Not allowed by CORS ${origin}`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(session({
  secret: process.env.COOKIE_SECRET || 'correct horse battery staple',
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: true },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/username', user);
app.use('/type', type);
app.use('/interview', interview);
app.use('/project', project);
app.use('/question', question);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};
  res.status(err.status || 500);
  res.send(res.locals.err);
});

module.exports = app;
