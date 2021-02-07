const express = require('express');

const router = express.Router();

router.delete('/', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
