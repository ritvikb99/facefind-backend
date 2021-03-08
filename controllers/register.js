const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  var hash = bcrypt.hashSync(password);
  var error = 0;
  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      if (Number(err.code) === 23505) {
        res.status(400).json('email-exists');
        error = 1;
        return;
      } else {
        res.status(400).json('unable-to-register');
        error = 1;
        return;
      }
    })
    .then(() => {
      if (!error) {
        db('login')
          .insert({
            hash: hash,
            email: email,
          })
          .catch((err) => res.status(400).json('unable-to-register'));
      }
    });
};

module.exports = {
  handleRegister: handleRegister,
};
