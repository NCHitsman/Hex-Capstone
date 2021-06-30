// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const systemRouter = require('./systems.js')
const mapRouter = require('./maps.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/systems', systemRouter)

router.use('/maps', mapRouter)

module.exports = router;
