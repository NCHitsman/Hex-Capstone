// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const systemRouter = require('./systems')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/systems', systemRouter)

module.exports = router;
