const router = require("express").Router();
const bcrypt = require('bcrypt')
const UserModel = require('../models/User.model')

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', async (req, res) => {
    try {
    const salt = await bcrypt.genSalt(13);  
    const password = await bcrypt.hash(req.body.password, salt);
    delete req.body.password
    const newBody = await UserModel.create({ username: req.body.username, password: password })
    res.send(newBody)
    }
    catch (error) {
      console.log('Error ', error)
    }
})

module.exports = router;
