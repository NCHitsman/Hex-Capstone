import { csrfFetch } from "./csrf"


const GET_TEAMS = 'teams/GET_TEAMS'

const getSystemTeams = (teams) => ({
    type: GET_TEAMS,
    payload: teams
})


export const getTeams = (systemId) => async dispatch  => {
    const res = await csrfFetch(`/api/systems/teams/${systemId}`)
    const data = await res.json()
    dispatch(getSystemTeams(data))
    return res
}


const teamReducer = (state = {}, action) => {
    let newState = {...state}

    switch (action.type){
        case GET_TEAMS:
            action.payload.forEach(team => newState[team.id] = team)
            return newState
        default:
            return state
    }
}


export default teamReducer
