const handleSignIn = (req, res, db, bcrypt) => {
  db('login')
    .select('email', 'hash')
    .where('email', '=', req.body.email)
    .then((data) => {
      isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        db.select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.json('cant get user');
          });
      } else {
        res.status(400).json('fail');
      }
    })
    .catch((err) => {
      res.status(400).json('fail');
    });
};

module.exports = {
  handleSignIn: handleSignIn,
};
