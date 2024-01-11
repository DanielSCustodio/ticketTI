module.exports.checkNameInput = function async(req, res, next) {
  const response = { name: req.body.name };
  const urlString = req.protocol + '://' + req.get('host') + req.originalUrl;
  const url = new URL(urlString);
  const pathSegments = url.pathname.split('/');
  const instance = pathSegments[1];

  if (response.name.length <= 3) {
    req.flash(
      'error-input-name',
      'Este campo deve conter pelo menos 4 caracteres.',
    );
    res.redirect(`/${instance}/cadastro`);

    return;
  }
  next();
};
