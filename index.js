const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
require('custom-env').env('development.local');

const app = express();

//Connection BD
const connection = require('./db/connection');

//Models
/* const Institution = require('./models/Institution');
const Departament = require('./models/Departament');
const Person = require('./models/Person');
const Administrator = require('./models/Administrator');
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
const TicketRoutes = require('./routes/Ticket');
const authRotes = require('./routes/Auth');
const DashboardRotes = require('./routes/Dashboard');

//middleware
const { checkAuth } = require('./middleware/helpers/auth');

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

//Session
app.use(
  session({
    name: 'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000000,
      expires: new Date(Date.now() + 360000000), // 5 dias
      httpOnly: true,
    },
  }),
);
//Mensagens Flash
app.use(flash());

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

//Routes
app.use('/instituicao', checkAuth, InstitutionRoutes);
app.use('/setor', checkAuth, DepartamentRoutes);
app.use('/colaborador', checkAuth, PersonRoutes);
app.use('/equipamento', checkAuth, EquipmentRoutes);
app.use('/administrador', checkAuth, AdministratorRoutes);
app.use('/tipo-de-referencia', checkAuth, ReferenceTypeRoutes);
app.use('/ticket', checkAuth, TicketRoutes);
app.use('/dashboard', checkAuth, DashboardRotes);
app.use('/', authRotes);
app.get('/', checkAuth, (_req, res) => {
  res.redirect('dashboard');
});

connection
  .sync({
    /*  force: true, */
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Aplicação em execução na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
