import { useParams } from "react-router-dom"
import { connect, useDispatch, useSelector } from 'react-redux'
import { getMap } from "../../store/maps"
import { getTeamPlayers, getTeams } from '../../store/teams'
import { getPermission } from "../../store/session"
import { useEffect, useState } from "react"
import Hex from "./Hex"
import { Canvas } from '@react-three/fiber'
import './MapPage.css'


const MapPage = ({teams, user, players }) => {
    const dispatch = useDispatch()
    const { systemId, mapId } = useParams()
    const [action, setAction] = useState({ type: null, body: {} })
    const [currentTeam, setCurrentTeam] = useState()

    let x = -21.92
    let y = -19.63
    let eachOther = true

    useEffect(() => {
        dispatch(getMap(mapId))
        dispatch(getTeams(systemId))
        dispatch(getTeamPlayers(systemId))
        dispatch(getPermission(systemId, user.id))
    }, [dispatch, mapId])

    useEffect(() => {
        teams &&
        user &&
        players &&
        setCurrentTeam(teams[teams.players[user.id].team_id])
    }, [setCurrentTeam, teams, user, players])

    const map = useSelector(state => state.maps.map)


    const hexClickHandler = (x, y) => {
    }


    return (
        <>
            <div className='mappage__parent__cont'>
                <Canvas
                    className="mapcanvas"
                    camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 30, 0], rotation: [-(Math.PI / 2.0), 0.0, 0.0] }}
                >
                    {/* <ambientLight /> */}
                    {/* <gridHelper args={[50,50]}/> */}
                    {/* <pointLight position={[10, 10, 10]} /> */}
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
                <div className='mapcontrols__cont'>
                    <div>Controls:</div>
                    <button>Add Control For '{currentTeam?.name}'</button>
                    <button>Command Bastion</button>
                    <button>Power Station</button>
                    <button>Shield Generator</button>
                    <button>Manufactorum</button>
                    <button>Hive City</button>
                </div>
            </div>
        </>
    )
}



export default connect(state => ({
    teams: state.teams,
    user: state.session.user,
    players: state.teams.players,
}))(MapPage)
