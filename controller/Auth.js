const Administrator = require('../models/Administrator');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await Administrator.findOne({ where: { email: email } });

    if (!user) {
      req.flash('error-login', 'Usuário não encontrado. Verifique seu e-mail.');
      res.render('auth/login');
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash(
        'error-login',
        'Parece que o seu teclado está jogando contra você. Verifique sua senha.',
      );
      res.render('auth/login');
      return;
    }

    req.session.userid = user.id;
    req.flash('message', `Olá, ${user.name}!`);
    req.session.save(() => {
      res.redirect('/posts');
    });
  }

  static register(req, res) {
    /*     if (req.session.userid) {
      res.redirect('/');
      return;
    } */
    res.render('auth/registro');
  }

  static async registerUser(req, res) {
    const { username, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      req.flash(
        'error-registro',
        'Ops! Houve um pequeno desentendimento entre a senha e a sua confirmação. Tente novamente!',
      );
      res.render('auth/registro');
      return;
    }

    const checkIfUserExists = await Administrator.findOne({
      where: { username: username },
    });

    if (checkIfUserExists) {
      req.flash('error-registro', 'Nome de usuário já cadastrado');
      res.render('auth/registro');
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      username,
      password: hashedPassword,
    };

    try {
      const createdUser = await Administrator.create(user);
      req.session.userid = createdUser.id;
      req.flash('message', 'Deu tudo certo, aproveite o Freethinking!');
      req.session.save(() => {
        res.redirect('/posts');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
};
