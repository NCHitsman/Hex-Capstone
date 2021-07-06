import { csrfFetch } from "./csrf"


const GET_TEAMS = 'teams/GET_TEAMS'
const GET_PLAYERS = 'teams/GET_PLAYERS'
const DELETE_TEAM = 'teams/DELETE_TEAM'
const REMOVE_USER = 'teams/REMOVE_USER'
const ADD_TEAM_PLAYER = 'teams/ADD_TEAM_PLAYER'
const CREATE_TEAM = 'teams/CREATE_TEAM'

const getSystemTeams = (teams) => ({
    type: GET_TEAMS,
    payload: teams
})

const getPlayers = (players) => ({
    type: GET_PLAYERS,
    payload: players
})

const deleteATeam = (teamId) => ({
    type: DELETE_TEAM,
    payload: teamId
})

const removeUser = (userId, teamId, data) => ({
    type: REMOVE_USER,
    payload: [userId, teamId, data]
})

const addUserTeam = (teamPlayer) => ({
    type: ADD_TEAM_PLAYER,
    payload: teamPlayer
})

const createATeam = (teamAndTeamPlayer) => ({
    type: CREATE_TEAM,
    payload: teamAndTeamPlayer
})

export const getTeams = (systemId) => async dispatch  => {
    const res = await csrfFetch(`/api/systems/teams/${systemId}`)
    const data = await res.json()
    dispatch(getSystemTeams(data))
    return res
}

export const getTeamPlayers = (systemId) => async dispatch  => {
    const res = await csrfFetch(`/api/systems/teamPlayers/${systemId}`)
    const data = await res.json()
    dispatch(getPlayers(data))
    return res
}

export const deleteTeam = (teamId) => async dispatch  => {
    await csrfFetch(`/api/systems/deleteTeam/${teamId}`, {method:'DELETE'})
    dispatch(deleteATeam(teamId))
    return teamId
}

export const removeFromTeam = (userId, teamId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/removeUserTeam/${userId}/${teamId}`, {method:'DELETE'})
    const data = await res.json()
    dispatch(removeUser(userId, teamId, data))
    return res
}

export const addUserToTeam = (userId, teamId, systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/addUserTeam`, {
        method:'POST',
        body: JSON.stringify({
            user_id: userId,
            team_id: teamId,
            system_id: systemId
        })
    })
    const data = await res.json()
    dispatch(addUserTeam(data))
    return res
}

export const createTeam = (name, faction, system_id, owner_id) => async dispatch => {
    const res = await csrfFetch(`/api/systems/createTeam`, {
        method:'POST',
        body: JSON.stringify({
            name,
            system_id,
            owner_id,
            faction,
            points: 0
        })
    })
    const data = await res.json()
    dispatch(createATeam(data))
    return res
}

const teamReducer = (state = {}, action) => {
    let newState = {...state}

    switch (action.type){
        case GET_TEAMS:
            action.payload.forEach(team => newState[team.id] = team)
            return newState
        case GET_PLAYERS:
            newState.players = {}
            action.payload.forEach(player => {
                newState[player.team_id].players ?
                newState[player.team_id].players[player.user_id] = player
                :
                newState[player.team_id].players = {};
                newState[player.team_id].players[player.user_id] = player

                newState.players[player.user_id] = player
            })
            return newState
        case DELETE_TEAM:
            let playerIds = Object.keys(newState[action.payload].players)
            playerIds.forEach(playerId => {
                console.log(newState.players[playerId])
                delete newState.players[playerId]
            })
            delete newState[action.payload]
            return newState
        case REMOVE_USER:
            delete newState.players[action.payload[0]]
            newState[action.payload[1]].players = {}
            action.payload[2].forEach(player => {
                newState[action.payload[1]].players[player.user_id] = player
            })
            return newState
        case ADD_TEAM_PLAYER:
            newState[action.payload.team_id].players[action.payload.user_id] = action.payload
            newState.players[action.payload.user_id] = action.payload
            return newState
        case CREATE_TEAM:
            newState[action.payload[0].id] = action.payload[0]
            newState[action.payload[0].id].players = {}
            return newState
        default:
            return state
    }
}


export default teamReducer
