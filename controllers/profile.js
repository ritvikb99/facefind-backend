const handleProfile = (req, res, db) => {
  db('users')
    .select('*')
    .where({
      id: req.params.id,
    })
    .then((user) => {
      if (users.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('User not found');
      }
    });
};
module.exports = {
  handleProfile: handleProfile,
};
