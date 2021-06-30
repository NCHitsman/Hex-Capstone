const express = require('express');
const asyncHandler = require('express-async-handler');
const { System } = require('../../db/models')

const router = express.Router();


router.get('/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const system = await System.findByPk(systemId)
    return system
}))

router.get('/user/:userId', asyncHandler(async(req, res) => {
    const {userId} = req.params
    const systems = await System.findAll({
        where: {
            owner_id: userId
        }
    })
    return systems
}))


module.exports = router;
