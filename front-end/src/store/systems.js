

const GET_SYSTEM = 'system/GET_SYSTEM'
const USER_SYSTEMS = 'system/USER_SYSTEMS'

const getASystem = (system) => ({
    type: GET_SYSTEM,
    payload: system
})

const getUserSystems = (systems) => ({
    type: USER_SYSTEMS,
    payload: systems
})


export const getSystem = (systemId) => async dispatch => {
    const res = await dispatch(`/api/systems/${systemId}`)
    const data = await res.json()
    dispatch(getASystem(data))
    return res
}

export const userSystems = (userId) => async dispatch => {
    const res = await dispatch(`/api/systems/user/${userId}`)
    const data = await res.json()
    dispatch(getUserSystems(data))
    return res
}


const systemDispatch = (state, action) => {
    let newState;

    switch (action.type) {
        case (GET_SYSTEM):
            newState = {...state}
            newState.system = action.payload
            return newState
        case (USER_SYSTEMS):
            newState = {...state}
            action.payload.map(system => {
                newState.userSystems[system.id] = system
            })
            return newState
        default:
            return newState
    }
}


export default systemDispatch
