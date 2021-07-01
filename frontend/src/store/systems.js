import { csrfFetch } from "./csrf"


const GET_SYSTEM = 'system/GET_SYSTEM'
const USER_SYSTEMS = 'system/USER_SYSTEMS'
const ADD_SYSTEM = 'system/ADD_SYSTEM'
const REMOVE_SYSTEM = 'system/REMOVE_SYSTEM'
const CLEAR_CURRENT = 'system/CLEAR_CURRENT'
const SYSTEM_USERS = 'system/SYSTEM_USERS'
const CLEAR_SYSUSERS = 'system/CLEAR_SYSUSERS'
const INVITED_SYSTEMS = 'system/INVITED_SYSTEMS'

const getASystem = (system) => ({
    type: GET_SYSTEM,
    payload: system
})

const userSystems = (systems) => ({
    type: USER_SYSTEMS,
    payload: systems
})

const addNewSystem = (system) => ({
    type: ADD_SYSTEM,
    payload: system
})

const removeASystem = (systemId) => ({
    type: REMOVE_SYSTEM,
    payload: systemId
})

const clearCurrent = () => ({
    type: CLEAR_CURRENT
})

const systemUsers = (systemUsers) => ({
    type: SYSTEM_USERS,
    payload: systemUsers
})

const clearSysUsers = () => ({
    type: CLEAR_SYSUSERS
})

const invitedSystems =(systems) => ({
    type: INVITED_SYSTEMS,
    payload: systems
})

export const getSystem = (systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/${systemId}`)
    const data = await res.json()
    dispatch(getASystem(data))
    return data
}

export const getUserSystems = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/user/${userId}`)
    const data = await res.json()
    dispatch(userSystems(data))
    return res
}

export const createNewSystem = (name, owner_id) => async dispatch => {
    const res = await csrfFetch(`/api/systems/new`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            owner_id
        })
    })
    const data = await res.json()
    dispatch(addNewSystem(data))
    return data.id
}

export const removeSystem = (systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/remove/${systemId}`, {method: 'DELETE'})
    const data = await res.json()
    dispatch(removeASystem(data))
    return res
}

export const clearCurrentSystem = () => async dispatch => {
    dispatch(clearCurrent())
}

export const getSystemUsers = (systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/systemUsers/${systemId}`)
    const data = await res.json()
    dispatch(systemUsers(data))
    return res
}

export const clearSystemUsers = () => async dispatch => {
    dispatch(clearSysUsers())
}

export const getInvitedSystems = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/invitedSystems/${userId}`)
    const data = await res.json()
    dispatch(invitedSystems(data))
    return res
}


const systemDispatch = (state = {}, action) => {
    let newState = {...state};

    switch (action.type) {
        case (GET_SYSTEM):
            newState.system = action.payload
            return newState
        case (USER_SYSTEMS):
            newState.userSystems = {}
            action.payload.forEach(system => newState.userSystems[system.id] = system)
            return newState
        case (ADD_SYSTEM):
            newState.userSystems[action.payload.id] = action.payload
            return newState
        case (REMOVE_SYSTEM):
            delete newState.userSystems[action.payload]
            return newState
        case (CLEAR_CURRENT):
            delete newState.system
            return newState
        case (SYSTEM_USERS):
            newState.systemUsers = {}
            action.payload.forEach(user => newState.systemUsers[user.id] = user)
            return newState
        case (CLEAR_SYSUSERS):
            delete newState.systemUsers
            return newState
        case (INVITED_SYSTEMS):
            newState.invitedSystems = {}
            action.payload.forEach(system => newState.invitedSystems[system.id] = system)
            return newState
        default:
            return state
    }
}


export default systemDispatch
