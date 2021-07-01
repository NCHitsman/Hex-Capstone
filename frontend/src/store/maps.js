

import { csrfFetch } from "./csrf"


const GET_MAP = 'map/GET_MAP'
const USER_MAPS = 'map/USER_MAPS'
const CLEAR = 'map/CLEAR'

const getAMap = (map) => ({
    type: GET_MAP,
    payload: map
})

const systemMaps = (maps) => ({
    type: USER_MAPS,
    payload: maps
})

const clear = () => ({
    type: CLEAR
})


export const getMap = (mapId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/${mapId}`)
    const data = await res.json()
    dispatch(getAMap(data))
    return res
}

export const getSystemMaps = (systemId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/system/${systemId}`)
    const data = await res.json()
    dispatch(systemMaps(data))
    return res
}

export const clearMaps = () => async dispatch => {
    dispatch(clear())
}


const mapDispatch = (state = {}, action) => {
    let newState = {...state};

    switch (action.type) {
        case (GET_MAP):
            newState.map = action.payload
            return newState
        case (USER_MAPS):
            newState.systemMaps = {}
            action.payload.forEach(map => {
                newState.systemMaps[map.id] = map
            })
            return newState
        case (CLEAR):
            return newState
        default:
            return state
    }
}


export default mapDispatch
