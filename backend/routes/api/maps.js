const express = require('express');
const asyncHandler = require('express-async-handler');
const { Map } = require('../../db/models')

const router = express.Router();

console.log(Map)

router.get('/:mapId', asyncHandler(async(req, res) => {
    const {mapId} = req.params
    const map = await Map.findByPk(mapId)
    res.json(map)
}))

router.get('/user/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const maps = await Map.findAll({
        where: {
            system_id: systemId
        }
    })
    res.json(maps)
}))


module.exports = router;
