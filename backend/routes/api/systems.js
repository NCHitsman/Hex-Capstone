const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { System, Permission, User } = require('../../db/models')

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
    await Permission.create({
        user_id: req.body.owner_id,
        system_id: id,
        level: 1,
    })
    res.json(system)
}))

router.delete('/remove/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const system = await System.findByPk(systemId)
    await system.destroy()
    res.json(systemId)
}))

router.get('/systemUsers/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const users = await Permission.findAll({
        where: {
            system_id: systemId
        },
        include: User,
        order: [['level', 'ASC']]
    })
    res.json(users)
}))

router.get('/invitedSystems/:userId', asyncHandler(async(req, res) => {
    const {userId} = req.params
    const systems = await Permission.findAll({
        where: {
            user_id: userId,
            level: {
                [Op.not]: 1,
            }
        },
        include: System
    })
    res.json(systems)
}))

router.post('/inviteUser/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const {username, level} = req.body
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (user) {
        await Permission.create({
        user_id: user.id,
        system_id: systemId,
        level,
        })
        let users = await Permission.findAll({
            where: {
                system_id: systemId
            },
            include: User,
            order: [['level', 'ASC']]
        })
        res.json(users)
    } else {
        res.json('NOT FOUND')
    }
}))

router.delete(`/removeUser/:systemId/:userId`, asyncHandler(async(req, res) => {
    const {systemId, userId} = req.params
    const premission = await Permission.findOne({
        where: {
            user_id: userId,
            system_id: systemId
        }
    })
    await premission.destroy()
    res.json('Sucsess')
}))

module.exports = router;
