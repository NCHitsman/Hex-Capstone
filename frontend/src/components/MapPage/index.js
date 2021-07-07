import { useParams } from "react-router-dom"
import { connect, useDispatch } from 'react-redux'
import { getMap, saveMapChanges } from "../../store/maps"
import { getTeamPlayers, getTeams } from '../../store/teams'
import { getPermission } from "../../store/session"
import { getSystem } from '../../store/systems'
import { useEffect, useState } from "react"
import Hex from "./Hex"
import { Canvas } from '@react-three/fiber'
import './MapPage.css'
import { factionSwitch } from "../utils"
import { OrbitControls } from '@react-three/drei'


const MapPage = ({ teams, user, players, system, map }) => {
    const dispatch = useDispatch()
    const { systemId, mapId } = useParams()
    const [action, setAction] = useState({ type: null, body: {} })
    const [currentTeam, setCurrentTeam] = useState(null)
    const [ownerOrCaptain, setOwnerOrCaptain] = useState(false)
    const [mapArray, setMapArray] = useState()

    let x = -21.92
    let y = -19.63
    let eachOther = true

    useEffect(() => {
        dispatch(getSystem(systemId))
        dispatch(getMap(mapId))
        dispatch(getTeams(systemId))
            .then(() => dispatch(getTeamPlayers(systemId)))
        dispatch(getPermission(systemId, user.id))
    }, [dispatch, mapId, systemId, user.id])

    useEffect(() => {
        user &&
            teams &&
            players &&
            !currentTeam &&
            setCurrentTeam(teams[teams.players[user.id].team_id])
        system &&
            setOwnerOrCaptain(system.owner_id === user.id
                || players[user.id].captain)
        map &&
            setMapArray(map.map_seed)


    }, [setCurrentTeam, teams, user, players, system, map, currentTeam])


    const hexClickHandler = (x, y, hexObject) => {
        switch (action.type) {
            case '[CTRL]':
                mapArray[x][y] = { c: action.body.faction, t: hexObject.t }
                setMapArray(mapArray)
                return [action.body.faction, factionSwitch(action.body.faction)[1]]
            case '[CMD]':
                mapArray[x][y] = { c: hexObject.c, t: '<CMD>' }
                setMapArray(mapArray)
                return '<CMD>'
            case '[PWR]':
                mapArray[x][y] = { c: hexObject.c, t: '<PWR>' }
                setMapArray(mapArray)
                return '<PWR>'
            case '[SLD]':
                mapArray[x][y] = { c: hexObject.c, t: '<SLD>' }
                setMapArray(mapArray)
                return '<SLD>'
            case '[MAN]':
                mapArray[x][y] = { c: hexObject.c, t: '<MAN>' }
                setMapArray(mapArray)
                return '<MAN>'
            case '[CLR]':
                mapArray[x][y] = { c: null, t: '<BLK>' }
                setMapArray(mapArray)
                return
            default:
                return
        }
    }


    const actionTypeText = () => {
        switch (action.type) {
            case '[CTRL]':
                return 'Click a hex to change territory...'
            case '[CMD]':
                return 'Click a hex to add a Command Bastion...'
            case '[PWR]':
                return 'Click a hex to add a Power Station...'
            case '[SLD]':
                return 'Click a hex to add a Shield Generator...'
            case '[MAN]':
                return 'Click a hex to add a Manufactorum...'
            case '[CLR]':
                return 'Click a hex to clear it...'
            default:
                return 'Choose from the options below to edit the map hexes...'
        }
    }



    return (
        <>
            {currentTeam && <div className='mappage__parent__cont'>
                <Canvas
                    className="mapcanvas"
                    camera={{
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                        position: [0, 30, 0],
                        rotation: [-(Math.PI / 2.0), 0.0, 0.0]
                    }}
                >
                    {/* <ambientLight /> */}
                    {/* <gridHelper args={[50,50]}/> */}
                    {/* <pointLight position={[10, 10, 10]} /> */}
                    <OrbitControls enableRotate={false} />
                    {map?.map_seed.map((xArray, xArrayIndex) => {
                        y += 1.51

                        if (eachOther) {
                            x = -22.22
                            eachOther = false
                        } else {
                            x = -23.11
                            eachOther = true
                        }

                        return (
                            xArray.map((hexObject, yArrayIndex) => {
                                x += 1.74
                                return (
                                    <Hex
                                        hexObject={hexObject}
                                        key={xArrayIndex + yArrayIndex
                                            + x + y}
                                        pos={[x, 0.3, y]}
                                        x={xArrayIndex}
                                        y={yArrayIndex}
                                        hexClickHandler={hexClickHandler}
                                        action={action} />
                                )
                            }))
                    })}
                </Canvas>


                {system &&
                    ownerOrCaptain &&
                    <div className='mapcontrols__cont'>

                        <div>Controls:</div>

                        <div>{actionTypeText()}</div>

                        {system.owner_id === user.id &&
                            <select
                                onChange={(e) => {
                                    setCurrentTeam(teams[e.target.value])
                                    setAction({ type: null, body: {} })
                                }}
                            >
                                {Object.entries(teams).map(([key, team]) => {
                                    if (key !== 'players') {
                                        return (
                                            <option key={team.name} value={team.id}>
                                                {team.name}
                                            </option>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </select>}


                        <button
                            onClick={() => {
                                action.type === '[CTRL]' ?
                                    setAction({ type: null, body: {} })
                                    :
                                    setAction({
                                        type: '[CTRL]', body: {
                                            faction: currentTeam.faction,
                                            color: factionSwitch(currentTeam.faction)[1]
                                        }
                                    })
                            }}
                        >Add Territory For '{currentTeam.name}'</button>


                        <button
                            onClick={() => {
                                action.type === '[CMD]' ?
                                    setAction({ type: null, body: {} })
                                    :
                                    setAction({ type: '[CMD]', body: {} })
                            }}
                        >Command Bastion</button>
                        <button
                            onClick={() => {
                                action.type === '[PWR]' ?
                                    setAction({ type: null, body: {} })
                                    :
                                    setAction({ type: '[PWR]', body: {} })
                            }}
                        >Power Station</button>
                        <button
                            onClick={() => {
                                action.type === '[SLD]' ?
                                    setAction({ type: null, body: {} })
                                    :
                                    setAction({ type: '[SLD]', body: {} })
                            }}
                        >Shield Generator</button>
                        <button
                            onClick={() => {
                                action.type === '[MAN]' ?
                                    setAction({ type: null, body: {} })
                                    :
                                    setAction({ type: '[MAN]', body: {} })
                            }}
                        >Manufactorum</button>

                        <button
                            onClick={() => {
                                action.type === '[CLR]' ?
                                    setAction({ type: null, body: {} })
                                    :
                                    setAction({ type: '[CLR]', body: {} })
                            }}
                        >Clear Square</button>

                        <button
                            onClick={() => {
                                dispatch(saveMapChanges(map.id, mapArray))
                            }}
                        >Save Changes</button>
                    </div>}


                <div>{currentTeam.name}</div>
            </div>}
        </>
    )
}


export default connect(state => ({
    teams: state.teams,
    user: state.session.user,
    players: state.teams.players,
    system: state.systems.system,
    map: state.maps.map
}))(MapPage)
