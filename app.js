import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello Express yes');
});

app.get('/hello', (req, res) => {
  res.render('index', {title: 'hello'});
});

module.exports = app;