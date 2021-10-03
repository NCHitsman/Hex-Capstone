import { useHistory, useParams } from "react-router-dom"
import { connect, useDispatch } from 'react-redux'
import { getMap, saveMapChanges } from "../../store/maps"
import { getTeamPlayers, getTeams } from '../../store/teams'
import { getPermission } from "../../store/session"
import { getSystem } from '../../store/systems'
import { useCallback, useEffect, useState } from "react"
import Hex from "./Hex"
import { Canvas } from '@react-three/fiber'
import './MapPage.css'
import { factionSwitch } from "../utils"
import { OrbitControls } from '@react-three/drei'
import backgroundImage from '../../images/orkattack.png'

const MapPage = ({ teams, user, players, system, map, permission }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { systemId, mapId } = useParams()
    const [action, setAction] = useState({ type: null, body: {} })
    const [currentTeam, setCurrentTeam] = useState(null)
    const [ownerOrCaptain, setOwnerOrCaptain] = useState(false)
    const [mapArray, setMapArray] = useState()
    const [threeD, setThreeD] = useState(false)

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true)
        }, 600)
        return () => {
            clearTimeout(timeout)
        }
    })

    let x = -21.92
    let y = -19.63
    let eachOther = true

    useEffect(() => {
        dispatch(getSystem(systemId)).then(res => {
            if (!res) {
                history.push('/')
                throw new Error()
            } else {
                dispatch(getMap(mapId)).then(res => {
                    if (!res) {
                        history.push('/')
                        throw new Error()
                    } else {
                        dispatch(getTeams(systemId))
                            .then(() => dispatch(getTeamPlayers(systemId)))
                        dispatch(getPermission(user.id, systemId))
                    }
                }).catch(err => { })
            }
        }).catch(err => { })
    }, [dispatch, mapId, systemId, user.id, history])


    useEffect(() => {
        user &&
            teams &&
            players &&
            !currentTeam &&
            setCurrentTeam(teams[teams.players[user.id]?.team_id])

        system && players && (permission || system.owner_id === user.id) &&
            setOwnerOrCaptain(system.owner_id === user.id
                || players[user.id]?.captain)

        map && setMapArray(map.map_seed)
    }, [setCurrentTeam, teams, user, players, system, map, currentTeam, permission])


    const hexClickHandler = useCallback((x, y, hexObject) => {
        const newArray = [...mapArray]
        switch (action.type) {
            case '[CTRL]':
                newArray[x][y] = { c: action.body.faction, t: hexObject.t }
                setMapArray(newArray)
                return [action.body.faction, factionSwitch(action.body.faction)[1]]
            case '[CMD]':
                newArray[x][y] = { c: hexObject.c, t: '<CMD>' }
                setMapArray(newArray)
                return '<CMD>'
            case '[PWR]':
                newArray[x][y] = { c: hexObject.c, t: '<PWR>' }
                setMapArray(newArray)
                return '<PWR>'
            case '[SLD]':
                newArray[x][y] = { c: hexObject.c, t: '<SLD>' }
                setMapArray(newArray)
                return '<SLD>'
            case '[MAN]':
                newArray[x][y] = { c: hexObject.c, t: '<MAN>' }
                setMapArray(newArray)
                return '<MAN>'
            case '[CLR]':
                newArray[x][y] = { c: null, t: '<BLK>' }
                setMapArray(newArray)
                return
            default:
                return
        }
    }, [mapArray, action.body.faction, action.type])


    const actionTypeText = useCallback(() => {
        switch (action.type) {
            case '[CTRL]':
                return 'Click and drag hexes to add or change territory...'
            case '[CMD]':
                return 'Click a hex to add a Command Bastion...'
            case '[PWR]':
                return 'Click a hex to add a Power Station...'
            case '[SLD]':
                return 'Click a hex to add a Shield Generator...'
            case '[MAN]':
                return 'Click a hex to add a Manufactorum...'
            case '[CLR]':
                return 'Click and drag hexes to clear them...'
            default:
                return 'Choose from the options below to edit the map hexes...'
        }
    }, [action.type])

    return (
        <>
            {teams && players && system && user && loaded && map ?
                (permission || system.owner_id === user.id) ?
                    <div className='MapPageParentCont'>
                        <div className='CanvasCont'>
                            <Canvas
                                className="mapcanvas"
                                camera={{
                                    fov: 75,
                                    near: 0.1,
                                    far: 1000,
                                    position: [0, 15, 0],
                                    rotation: [-(Math.PI / 2.0), 0.0, 0.0]
                                }}
                            >
                                <OrbitControls enableRotate={threeD} />
                                {map.map_seed.map((xArray, xArrayIndex) => {
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
                                            if (hexObject.t) {
                                                return (
                                                    <Hex
                                                        hexObject={hexObject}
                                                        key={`${xArrayIndex}, ${yArrayIndex}`}
                                                        pos={[x, 0.3, y]}
                                                        x={xArrayIndex}
                                                        y={yArrayIndex}
                                                        hexClickHandler={hexClickHandler}
                                                        action={action} />
                                                )
                                            }
                                            return null
                                        }))
                                })}
                            </Canvas>
                            <button
                                className='MapThreeDButton'
                                onClick={() => threeD ? setThreeD(false) : setThreeD(true)}
                            >
                                {threeD ? 'Change to 2d' : 'Change to 3d'}
                            </button>
                        </div>

                        <div className='MapInfoCont'>

                            <div className='MapNameTypeCont'>
                                <div className='MapName'>{map.name}</div>
                                <div className='MapType'>{
                                    map.type === '[PLT]' ?
                                        'Planet' :
                                        map.type === '[MON]' ?
                                            'Moon' :
                                            map.type === '[AST]' ?
                                                'Asteroid' :
                                                'Ship'
                                }</div>
                            </div>

                            {system &&
                                ownerOrCaptain &&
                                <div className='MapControlsCont'>

                                    <div className='ActionTypeTextCont'>
                                        <div className='ActionTypeText'>{actionTypeText()}</div>
                                    </div>


                                    <div className='MapControlsInnerCont'>

                                        {system.owner_id === user.id &&
                                            Object.values(teams).length > 1 &&
                                            <>
                                                <select
                                                    className='TeamSelect'
                                                    onChange={(e) => {
                                                        setCurrentTeam(teams[e.target.value])
                                                        setAction({ type: null, body: {} })
                                                    }}
                                                >
                                                    {Object.entries(teams).map(([key, team], i) => {
                                                        if (key !== 'players') {
                                                            return (
                                                                <option key={i} value={team.id}>
                                                                    {team.name}
                                                                </option>
                                                            )
                                                        } else {
                                                            return null
                                                        }
                                                    })}
                                                </select>
                                            </>}


                                        {(ownerOrCaptain || system.owner_id === user.id) && <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                action.type === '[CTRL]' ?
                                                    setAction({ type: null, body: {} })
                                                    :
                                                    setAction({
                                                        type: '[CTRL]', body: {
                                                            faction: currentTeam?.faction,
                                                            color: factionSwitch(currentTeam?.faction)[1]
                                                        }
                                                    })
                                            }}
                                        >Add Territory For '{currentTeam ? currentTeam.name : setCurrentTeam(Object.values(teams)[0]) && Object.values(teams)[0].name}'</button>}


                                        <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                action.type === '[CMD]' ?
                                                    setAction({ type: null, body: {} })
                                                    :
                                                    setAction({ type: '[CMD]', body: {} })
                                            }}
                                        >Command Bastion</button>
                                        <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                action.type === '[PWR]' ?
                                                    setAction({ type: null, body: {} })
                                                    :
                                                    setAction({ type: '[PWR]', body: {} })
                                            }}
                                        >Power Station</button>
                                        <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                action.type === '[SLD]' ?
                                                    setAction({ type: null, body: {} })
                                                    :
                                                    setAction({ type: '[SLD]', body: {} })
                                            }}
                                        >Shield Generator</button>
                                        <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                action.type === '[MAN]' ?
                                                    setAction({ type: null, body: {} })
                                                    :
                                                    setAction({ type: '[MAN]', body: {} })
                                            }}
                                        >Manufactorum</button>

                                        <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                action.type === '[CLR]' ?
                                                    setAction({ type: null, body: {} })
                                                    :
                                                    setAction({ type: '[CLR]', body: {} })
                                            }}
                                        >Clear Square</button>

                                        <button
                                            className='MapControlButton'
                                            onClick={() => {
                                                dispatch(saveMapChanges(map.id, mapArray))
                                            }}
                                        >Save Changes</button>
                                    </div>
                                </div>}
                        </div>
                    </div>
                    :
                    <div className='LoadingTextCont'>
                        <div style={{ color: 'white' }} className='PermError'>YOU DO NOT HAVE PERMISSION TO VIEW THIS MAP</div>
                    </div>
                :
                <div className='LoadingTextCont'>
                    <div className='LoadingText systemPage'>Loading...</div>
                </div>
            }
            <img
                className='BackgroundImage'
                src={backgroundImage}
                loading='eager'
                alt='Warzone Orkz 2© by Sergei Panin; https://www.artstation.com/artwork/W2wbOQ' />
        </>
    )
}


export default connect(state => ({
    map: state.maps.map,
    teams: state.teams,
    user: state.session.user,
    players: state.teams.players,
    system: state.systems.system,
    permission: state.session.permission
}))(MapPage)
