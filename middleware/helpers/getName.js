const Person = require('../../models/Person');
const Administrator = require('../../models/Administrator');

module.exports.getName = async function (req) {
  const id = req.session.userid;

  const user = await Administrator.findOne({
    raw: true,
    where: { id: id },
    include: [Person],
  });

  const loggedInUser = {
    id: user.id,
    name: user['Person.name'],
  };
  return loggedInUser;
};
