const express = require('express');
const asyncHandler = require('express-async-handler');
const { System } = require('../../db/models')

const router = express.Router();

router.get('/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const system = await System.findByPk(systemId)
    res.json(system)
}))

router.get('/user/:userId', asyncHandler(async(req, res) => {
    const {userId} = req.params
    const systems = await System.findAll({
        where: {
            owner_id: userId
        }
    })
    res.json(systems)
}))

router.post('/new', asyncHandler(async(req, res) => {
    const {id} = await System.create(req.body)
    const system = await System.findByPk(id)
    res.json(system)
}))

router.delete('/remove/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const system = await System.findByPk(systemId)
    system.destroy()
    res.json(systemId)
}))

module.exports = router;
