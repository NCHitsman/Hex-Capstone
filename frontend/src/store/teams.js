import { csrfFetch } from "./csrf"


const GET_TEAMS = 'teams/GET_TEAMS'
const GET_PLAYERS = 'teams/GET_PLAYERS'

const getSystemTeams = (teams) => ({
    type: GET_TEAMS,
    payload: teams
})

const getPlayers = (players) => ({
    type: GET_PLAYERS,
    payload: players
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
                newState[player.team_id].players = [...newState[player.team_id].players, player]
                :
                newState[player.team_id].players = [player];
                newState.players[player.user_id] = player
            })
            return newState
        default:
            return state
    }
}


export default teamReducer
