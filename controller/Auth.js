const Administrator = require('../models/Administrator');
const Person = require('../models/Person');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(_req, res) {
    res.render('auth/login');
  }

  static async loginUser(req, res) {
    const { username, password } = req.body;

    const user = await Administrator.findOne({
      raw: true,
      where: { username: username },
    });

    if (!user) {
      req.flash('error-login', 'Usuário não encontrado.');
      res.render('auth/login');
      return;
    }

    const person = await Person.findOne({
      raw: true,
      where: { id: user.PersonId },
    });
    /* 
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash('error-login', 'Senha inválida.');
      res.render('auth/login');
      return;
    } */

    req.session.userid = user.id;

    req.flash('sucess-login', `Olá, ${person.name}!`);
    req.session.save(() => {
      res.redirect('/dashboard');
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
};
