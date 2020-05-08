const router = require('express').Router();
const task = require('./task');
const user = require('./user');

router.use('/tasks', task);
router.use('/users', user);

module.exports = router;