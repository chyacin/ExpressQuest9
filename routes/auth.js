const authRouter = require('express').Router();
const User = require('../models/user');

authRouter.post('/checkCredentials', (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (!user) res.status(401).send('Password or email is wrong');
    else {
      User.verifyPassword(password, user.hashedPassword).then(
        (passwordIsCorrect) => {
          if (passwordIsCorrect) res.send('Your credentials are valid !');
          else res.status(401).send('Password or email is wrong');
        }
      );
    }
  });
});

module.exports = authRouter;