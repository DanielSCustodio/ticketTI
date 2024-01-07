const Administrator = require('../models/Administrator');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(_req, res) {
    res.render('auth/login');
  }

  static async loginUser(req, res) {
    const { username, password } = req.body;

    const user = await Administrator.findOne({ where: { username: username } });

    if (!user) {
      req.flash('error-login', 'Usuário não encontrado.');
      res.render('auth/login');
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash('error-login', 'Senha inválida.');
      res.render('auth/login');
      return;
    }

    req.session.userid = user.id;
    req.flash('sucess-login', `Olá, ${user.name}!`);
    req.session.save(() => {
      res.redirect('/administrador');
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
};
