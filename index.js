const express = require('express');
const exphbs = require('express-handlebars');
require('custom-env').env('development.local');

const app = express();

//Connection BD
const connection = require('./db/connection');

//Models

//Routes

//Template Engine
app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

//Static Files
app.use(express.static('public'));

//Get body
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

//Routes
app.get('/', (_req, res) => {
  res.send('Ok');
});

connection.sync().then(() => {
  app.listen(process.env.PORT, 'localhost', () => {
    console.log(`Aplicação em execução na porta ${process.env.PORT}`);
  });
});
