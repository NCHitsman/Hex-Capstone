const express = require('express');
const asyncHandler = require('express-async-handler');
const { Map } = require('../../db/models')

const router = express.Router();


router.get('/:mapId', asyncHandler(async(req, res) => {
    const {mapId} = req.params
    const map = await Map.findByPk(mapId)
    return map
}))

router.get('/user/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const maps = await Map.findAll({
        where: {
            system_id: systemId
        }
    })
    return maps
}))


module.exports = router;
