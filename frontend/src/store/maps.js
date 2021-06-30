

import { csrfFetch } from "./csrf"


const GET_MAP = 'map/GET_MAP'
const USER_MAPS = 'map/USER_MAPS'

const getAMap = (map) => ({
    type: GET_MAP,
    payload: map
})

const getSystemMaps = (maps) => ({
    type: USER_MAPS,
    payload: maps
})


export const getMap = (mapId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/${mapId}`)
    const data = await res.json()
    dispatch(getAMap(data))
    return res
}

export const systemMaps = (systemId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/system/${systemId}`)
    const data = await res.json()
    dispatch(getSystemMaps(data))
    return res
}


const mapDispatch = (state = {}, action) => {
    let newState;

    switch (action.type) {
        case (GET_MAP):
            newState = {...state}
            newState.map = action.payload
            return newState
        case (USER_MAPS):
            newState = {...state}
            action.payload.forEach(map => {
                newState.systemMaps[map.id] = map
            })
            return newState
        default:
            return state
    }
}


export default mapDispatch
