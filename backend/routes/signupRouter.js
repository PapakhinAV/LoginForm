const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    email, password, name,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      password: hashedPassword,
      email,
    });
    await user.save();
    res.json({ id: user._id });
  } catch (err) {
    return res.status(401).end();
  }
});

module.exports = router;
