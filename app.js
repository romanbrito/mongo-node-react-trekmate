import config from './config';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';

import index from './routes/index';
import users from './routes/users';
import apiRouter from './api';

const app = express();

// set handlebars
import exphbs from 'express-handlebars';

const hbs = exphbs.create({
// helpers : helpers,
  defaultLayout: 'main',
  partialsDir: [
    // 'shared/templates/',
    'views/partials/'
  ]
});

// view engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

import serverRender from './serverRender';

app.get(['/', '/contest/:contestId'], (req,res) => { // multiple routes
  // console.log(req.params.contestId);
  serverRender(req.params.contestId)
    .then(( { initialMarkup, initialData } ) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad request');
    });
});

// app.use('/', index);
// app.use('/users', users);
app.use('/api', apiRouter);

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port, config.serverUrl);
});