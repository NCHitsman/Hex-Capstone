import { useParams } from "react-router-dom"
import { connect, useDispatch } from 'react-redux'
import { getMap } from "../../store/maps"
import { getTeamPlayers, getTeams } from '../../store/teams'
import { getPermission } from "../../store/session"
import { getSystem } from '../../store/systems'
import { useEffect, useState } from "react"
import Hex from "./Hex"
import { Canvas } from '@react-three/fiber'
import './MapPage.css'
import { factionSwitch } from "../utils"
import { OrbitControls } from '@react-three/drei'


const MapPage = ({teams, user, players, system, map}) => {
    const dispatch = useDispatch()
    const { systemId, mapId } = useParams()
    const [action, setAction] = useState({ type: null, body: {} })
    const [currentTeam, setCurrentTeam] = useState()
    const [ownerOrCaptain, setOwnerOrCaptain] = useState(false)
    const [mapArray, setMapArray] = useState()

    let x = -21.92
    let y = -19.63
    let eachOther = true

    useEffect(() => {
        dispatch(getSystem(systemId))
        dispatch(getMap(mapId))
        dispatch(getTeams(systemId))
        .then(()=>dispatch(getTeamPlayers(systemId)))
        dispatch(getPermission(systemId, user.id))
    }, [dispatch, mapId, systemId, user.id])

    useEffect(() => {
        user &&
        teams &&
        players &&
        setCurrentTeam(teams[teams.players[user.id].team_id])
        system &&
        setOwnerOrCaptain(system.owner_id === user.id || players[user.id].captain)
        map &&
        setMapArray(map.map_seed)
    }, [setCurrentTeam, teams, user, players, system, map])


    const hexClickHandler = (x, y, t) => {
        switch (action.type) {
            case '[CRTL]':
                mapArray[x][y] = {c: action.body.faction, t}
                setMapArray(mapArray)
                console.log(mapArray)
                return factionSwitch(action.body.faction)[1]
            default:
                return
        }
    }



    return (
        <>
            {currentTeam && <div className='mappage__parent__cont'>
                <Canvas
                    className="mapcanvas"
                    camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 30, 0], rotation: [-(Math.PI / 2.0), 0.0, 0.0] }}
                >
                    {/* <ambientLight /> */}
                    {/* <gridHelper args={[50,50]}/> */}
                    {/* <pointLight position={[10, 10, 10]} /> */}
                    <OrbitControls />
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
                                        key={xArrayIndex + yArrayIndex + x + y}
                                        pos={[x, 0.3, y]}
                                        x={xArrayIndex}
                                        y={yArrayIndex}
                                        hexClickHandler={hexClickHandler}
                                        action={action} />
                                )
                            }))
                    })}
                </Canvas>


                {system && ownerOrCaptain && <div className='mapcontrols__cont'>
                    <div>Controls:</div>

                    {system.owner_id === user.id &&
                    <select
                    value={currentTeam}
                    onChange={(e) => setCurrentTeam(e.target.value)}
                    >
                        {Object.entries(teams).map(([key, team]) => {
                            if (key !== 'players') {
                                return (
                                    <option key={team.name} value={team}>{team.name}</option>
                                )
                            } else {
                                return null
                            }
                        })}
                    </select>}

                    <button
                    onClick={() => {
                        action.type === '[CRTL]' ?
                        setAction({ type: null, body: {} })
                        :
                        setAction({ type: '[CRTL]', body: {faction: currentTeam.faction, color: factionSwitch(currentTeam.faction)[1]} })
                    }}
                    >Add Control For '{currentTeam.name}'</button>
                    <button>Command Bastion</button>
                    <button>Power Station</button>
                    <button>Shield Generator</button>
                    <button>Manufactorum</button>
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
