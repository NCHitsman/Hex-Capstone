import { csrfFetch } from "./csrf"


const GET_SYSTEM = 'system/GET_SYSTEM'
const USER_SYSTEMS = 'system/USER_SYSTEMS'
const ADD_SYSTEM = 'system/ADD_SYSTEM'
const REMOVE_SYSTEM = 'system/REMOVE_SYSTEM'
const CLEAR_CURRENT = 'system/CLEAR_CURRENT'
const SYSTEM_USERS = 'system/SYSTEM_USERS'
const CLEAR_SYSUSERS = 'system/CLEAR_SYSUSERS'
const INVITED_SYSTEMS = 'system/INVITED_SYSTEMS'
const CLEAR = 'system/CLEAR'
const REMOVE_USER = 'system/REMOVE_USER'
const ACCEPT_INVITE = 'system/ACCEPT_INVITE'
const DECLINE_INVITE = 'system/DECLINE_INVITE'

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

const clear = () => ({
    type: CLEAR
})

const removeAUser = (userId) => ({
    type: REMOVE_USER,
    payload: userId
})

const acceptAnInvite = (permission) => ({
    type: ACCEPT_INVITE,
    payload: permission
})

const declineAnInvite = (systemId) => ({
    type: DECLINE_INVITE,
    payload: systemId
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

export const inviteUser = (username, level, systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/inviteUser/${systemId}`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            level
        })
    })
    const data = await res.json()
    if (data === 'NOT FOUND') {
        return data
    }
    dispatch(systemUsers(data))
    return res
}

export const clearAllSystems = () => async dispatch => {
    dispatch(clear())
}

export const removeUser = (userId, systemId, i = null) => async dispatch => {
    const res = await csrfFetch(`/api/systems/removeUser/${systemId}/${userId}`, {method: 'DELETE'})
    if (i) dispatch(removeAUser(i))
    return res
}

export const acceptInvite = (userId, systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/acceptInvite/${userId}/${systemId}`, {method: 'PATCH'})
    const data = await res.json()
    dispatch(acceptAnInvite(data))
    return res
}

export const declineInvite = (userId, systemId) => async dispatch => {
    const res = await csrfFetch(`/api/systems/declineInvite/${userId}/${systemId}`, {method: 'DELETE'})
    const data = await res.json()
    dispatch(declineAnInvite(data))
    return res
}

const systemDispatch = (state = {}, action) => {
    let newState = {...state};

    switch (action.type) {
        case (USER_SYSTEMS):
            newState.userSystems = {}
            action.payload.forEach(system => newState.userSystems[system.id] = system)
            return newState
        case (INVITED_SYSTEMS):
            newState.invitedSystems = {}
            action.payload.forEach(system => newState.invitedSystems[system.id] = system)
            return newState
        case (ADD_SYSTEM):
            newState.userSystems[action.payload.id] = action.payload
            return newState
        case (REMOVE_SYSTEM):
            delete newState.userSystems[action.payload]
            return newState
        case (GET_SYSTEM):
            newState.system = action.payload
            return newState
        case (SYSTEM_USERS):
            newState.systemUsers = action.payload
            return newState
        case (REMOVE_USER):
            delete newState.systemUsers[action.payload]
            return newState
        case (ACCEPT_INVITE):
            newState.invitedSystems[action.payload.id] = action.payload
            return newState
        case (DECLINE_INVITE):
            delete newState.invitedSystems[action.payload]
            return newState
        case (CLEAR_CURRENT):
            delete newState.system
            return newState
        case (CLEAR_SYSUSERS):
            delete newState.systemUsers
            return newState
        case (CLEAR):
            newState = {}
            return newState
        default:
            return state
    }
}


export default systemDispatch
