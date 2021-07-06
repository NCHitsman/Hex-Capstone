const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { System, Permission, User, Team, Team_Player } = require('../../db/models')

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
        status: '[ACPT]'
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
        const test = await Permission.findOne({
            where:{
                user_id: user.id,
                system_id: systemId
            }
        })
        if (test) {
            res.json('ALREADY INVITED')
        } else {
            await Permission.create({
            user_id: user.id,
            system_id: systemId,
            level,
            status: '[PEND]'
            })
            let users = await Permission.findAll({
                where: {
                    system_id: systemId
                },
                include: User,
                order: [['level', 'ASC']]
            })
            res.json(users)
        }
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
    const teamPlayers = await Team_Player.findAll({
        where:{
            user_id: userId,
            system_id: systemId
        }
    })
    if (teamPlayers) {
        teamPlayers.forEach(async tp => {
            await tp.destroy()
        })
    }
    res.json('Success')
}))

router.patch(`/acceptInvite/:userId/:systemId`, asyncHandler(async(req, res) => {
    const {userId, systemId} = req.params
    await Permission.update({status: '[ACPT]'}, {
        where: {
            user_id: userId,
            system_id: systemId,
            status: '[PEND]'
        }
    })
    const premission = await Permission.findOne({
        where: {
            user_id: userId,
            system_id: systemId,
        },
        include: System
    })
    res.json(premission)
}))

router.delete('/declineInvite/:userId/:systemId', asyncHandler(async(req, res) => {
    const {userId, systemId} = req.params
    const premission = await Permission.findOne({
        where: {
            user_id: userId,
            system_id: systemId
        }
    })
    const permissionId = premission.id
    await premission.destroy()
    res.json(permissionId)
}))

router.get('/teams/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const teams = await Team.findAll({
        where: {
            system_id: systemId
        }
    })
    res.json(teams)
}))

router.get('/teamPlayers/:systemId', asyncHandler(async(req, res) => {
    const {systemId} = req.params
    const players = await Team_Player.findAll({
        where: {
            system_id: systemId
        },
        include: User
    })
    res.json(players)
}))

router.delete('/deleteTeam/:teamId', asyncHandler(async(req, res) => {
    const {teamId} = req.params
    const team = await Team.findByPk(teamId)
    await team.destroy()
    res.json(teamId)
}))

router.delete('/removeUserTeam/:userId/:teamId', asyncHandler(async(req, res) => {
    const {userId, teamId} = req.params
    const teamPlayer = await Team_Player.findOne({
        where: {
            user_id: userId,
            team_id: teamId
        }
    })
    await teamPlayer.destroy()
    const teamPlayers = await Team_Player.findAll({
        where: {
            team_id: teamId
        },
        include: User
    })
    res.json(teamPlayers)
}))

router.post('/addUserTeam', asyncHandler(async(req, res) => {
    const {id} = await Team_Player.create(req.body)
    const teamPlayer = await Team_Player.findByPk(id, {include: User})
    res.json(teamPlayer)
}))

router.post('/createTeam', asyncHandler(async(req, res) => {
    const {id} = await Team.create(req.body)
    const team = await Team.findByPk(id)
    res.json(team)
}))

module.exports = router;
