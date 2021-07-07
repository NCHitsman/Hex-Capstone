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

router.get('/system/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const maps = await Map.findAll({
        where: {
            system_id: systemId
        }
    })
    res.json(maps)
}))

router.post('/createMap', asyncHandler(async(req, res) => {
    const {id} = await Map.create(req.body)
    res.json(id)
}))

router.delete('/removeMap/:mapId', asyncHandler(async(req, res) => {
    const {mapId} = req.params
    const map = await Map.findByPk(mapId)
    await map.destroy()
    res.json(mapId)
}))

router.patch('/update/:mapId', asyncHandler(async(req, res) => {
    const {mapId} = req.params
    const map = await Map.findByPk(mapId)
    map.map_seed = req.body
    await map.save()
    res.json(map)
}))


module.exports = router;
