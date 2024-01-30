//Administrator
const Administrator = require('../../models/Administrator');
const Person = require('../../models/Person');

module.exports.checkAdministrator = async function async(req, res, next) {
  const { personSelected, username, password, confirmpassword } = req.body;

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
    res.render('administrador/create', { people });
    return;
  }

  if (checkIfUserExists) {
    req.flash('error-input-administrator', 'Nome de usuário já cadastrado');
    const people = await Person.findAll({ raw: true });
    res.render('administrador/create', { people });
    return;
  }

  if (password.length <= 5) {
    req.flash(
      'error-input-administrator',
      'O campo "senha" deve conter pelo menos 6 caracteres. ',
    );
    res.render('administrador/create', { people });
    return;
  }

  if (password !== confirmpassword) {
    req.flash('error-input-administrator', 'Senhas não conferem!');
    const people = await Person.findAll({ raw: true });
    res.render('administrador/create', { people });
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
