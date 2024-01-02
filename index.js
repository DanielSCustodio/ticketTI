const express = require('express');
const exphbs = require('express-handlebars');
require('custom-env').env('development.local');

const app = express();

//Connection BD
const connection = require('./db/connection');

//Models
/* const Institution = require('./models/Institution');
const Departament = require('./models/Departament');
const Person = require('./models/Person');
const Administrador = require('./models/Administrator');
const Equipment = require('./models/Equipment');
const ReferenceType = require('./models/ReferenceType');
const Ticket = require('./models/Ticket'); */

//Routes
const InstitutionRoutes = require('./routes/Institution');
const DepartamentRoutes = require('./routes/Departament');
const PersonRoutes = require('./routes/Person');
const EquipmentRoutes = require('./routes/Equipment');
const AdministratorRoutes = require('./routes/Administrator');
const ReferenceTypeRoutes = require('./routes/ReferenceType');

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
app.use('/instituicao', InstitutionRoutes);
app.use('/setor', DepartamentRoutes);
app.use('/colaborador', PersonRoutes);
app.use('/equipamento', EquipmentRoutes);
app.use('/administrador', AdministratorRoutes);
app.use('/tipo-de-referencia', ReferenceTypeRoutes);
app.get('/', (_req, res) => {
  res.send('Ok');
});

connection.sync(/* { force: true } */).then(() => {
  app.listen(process.env.PORT, 'localhost', () => {
    console.log(`Aplicação em execução na porta ${process.env.PORT}`);
  });
});
