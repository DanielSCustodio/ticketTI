//Administrator
const Administrator = require('../../models/Administrator');
const Person = require('../../models/Person');
const Ticket = require('../../models/Ticket');
const { getName } = require('../../middleware/helpers/getName');
const bcrypt = require('bcryptjs');

module.exports.checkAdministrator = async function async(req, res, next) {
  const { personSelected, username, password, confirmpassword } = req.body;
  const loggedInUser = await getName(req);

  let people = await Person.findAll({ raw: true });
  const adm = await Administrator.findAll({ raw: true });

  const adminIds = adm.map((admin) => admin.PersonId);
  people = people.filter((person) => !adminIds.includes(person.id));

  const checkIfUserExists = await Administrator.findOne({
    where: { username: username },
  });

  if (!personSelected) {
    req.flash(
      'error-input-administrator',
      'O campo "colaborador" deve ser preenchido. Clique na lupa para selecionar.',
    );
    res.render('administrador/create', { people, loggedInUser });
    return;
  }

  if (username.length <= 3) {
    req.flash(
      'error-input-administrator',
      'O campo "nome de de usuário" deve conter pelo menos 4 caracteres.',
    );
    res.render('administrador/create', { people, loggedInUser });
    return;
  }

  if (checkIfUserExists) {
    req.flash('error-input-administrator', 'Nome de usuário já cadastrado');
    people = people.filter((person) => !adminIds.includes(person.id));

    res.render('administrador/create', { people, loggedInUser });
    return;
  }

  if (password.length <= 5) {
    req.flash(
      'error-input-administrator',
      'O campo "senha" deve conter pelo menos 6 caracteres. ',
    );
    res.render('administrador/create', { people, loggedInUser });
    return;
  }

  if (password !== confirmpassword) {
    req.flash('error-input-administrator', 'Senhas não conferem.');
    people = people.filter((person) => !adminIds.includes(person.id));

    res.render('administrador/create', { people, loggedInUser });
    return;
  }

  next();
};

//Administrator Privilege
module.exports.checkPrivilege = async function async(req, res, next) {
  const id = req.session.userid;
  const urlString = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = new URL(urlString);
  const pathSegments = url.pathname.split('/');
  const instance = pathSegments[1];

  const user = await Administrator.findOne({
    where: { id: id },
  });

  if (!user.privilege) {
    req.flash(
      'error-privilege',
      'Você não possui privilégios de administrador.',
    );
    res.redirect(`/${instance}`);
    return;
  }
  next();
};

module.exports.checkDeleteAdministator = async function async(req, res, next) {
  const AdministratorId = req.body.id;
  const administrators = await Administrator.findAll({ raw: true });
  const loggedInUser = await getName(req);

  const administratorWithTicket = await Ticket.findOne({
    raw: true,
    where: { AdministratorId: AdministratorId },
  });

  if (administratorWithTicket) {
    req.flash(
      'error-privilege',
      `Este administrador não pode ser removido, pois está associado ao ticket ${administratorWithTicket.id}.`,
    );
    res.render('administrador/all', { administrators, loggedInUser });
    return;
  }
  next();
};

module.exports.checkAllPrivilege = async function async(req, res, next) {
  const id = req.session.userid;
  const user = await Administrator.findOne({
    where: { id: id },
  });

  if (!user.allPrivileges) {
    res.redirect('/dashboard');
    return;
  }
  next();
};

module.exports.redirectAdministrator = async function async(req, res, next) {
  const id = req.params.id;
  const userId = req.session.userid;

  // Verifica se o ID na URL é diferente do ID do usuário na sessão
  if (Number(id) !== userId) {
    // Verifica se já foi redirecionado antes para evitar o loop de redirecionamento
    if (!req.session.redirected) {
      // Define a flag na sessão para indicar que o redirecionamento ocorreu
      req.session.redirected = true;
    }
    res.redirect(`/administrador/editar/${userId}`);
    return;
  }

  // Se o ID na URL for igual ao ID do usuário na sessão ou se já foi redirecionado, passa para o próximo middleware
  next();
};

module.exports.checkUpdateAdministrator = async function async(req, res, next) {
  const userId = req.session.userid;

  const { username, passwordOld, password, confirmpassword } = req.body;
  const user = await Administrator.findOne({
    where: { id: userId },
    raw: true,
  });

  const passwordOldMatch = bcrypt.compareSync(passwordOld, user.password);

  if (username.length <= 3) {
    req.flash(
      'error-input-administrator',
      'O campo "nome de de usuário" deve conter pelo menos 4 caracteres.',
    );
    res.redirect(`/administrador/editar/${userId}`);
    return;
  }

  if (!passwordOldMatch) {
    req.flash('error-input-administrator', 'Senha antiga inválida.');
    res.redirect(`/administrador/editar/${userId}`);
    return;
  }

  if (password !== confirmpassword) {
    req.flash('error-input-administrator', 'Senhas não conferem.');
    res.redirect(`/administrador/editar/${userId}`);
    return;
  }

  if (password.length <= 5) {
    req.flash(
      'error-input-administrator',
      'O campo "senha" deve conter pelo menos 6 caracteres.',
    );
    res.redirect(`/administrador/editar/${userId}`);
    return;
  }

  next();
};
