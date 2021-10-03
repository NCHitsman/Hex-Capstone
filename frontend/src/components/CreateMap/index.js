import './CreateMap.css'
import { Canvas } from '@react-three/fiber'
import { range } from 'lodash'
import CreateMapHex from './CreateMapHex'
import { useState, memo, useEffect } from 'react'
import { createMap } from '../../store/maps'
import { connect, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import backgroundImage from '../../images/SpaceMarines.png'
import { getSystem } from '../../store/systems'
import { getPermission } from '../../store/session'

const CreateMap = memo(({ system, user, level }) => {
    const { systemId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [mapArray, setMapArray] = useState(range(25).map(() => range(25)))
    const [action, setAction] = useState({ type: null, body: {} })
    const [mapName, setMapName] = useState('')
    const [mapType, setMapType] = useState('[PLT]')

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
            }
        }).catch(err => { })

        if (user) dispatch(getPermission(user.id, systemId))

    }, [user, history, dispatch, systemId])

    const hexClickHandler = (x, y) => {
        switch (action.type) {
            case '[RMV]':
                mapArray[x][y] = y
                setMapArray(mapArray)
                break
            default:
                mapArray[x][y] = { t: '<BLK>', c: null }
                setMapArray(mapArray)
        }
    }

    const MapSubmitHandler = () => {
        dispatch(createMap(mapName, mapType, system.id, 25, mapArray))
            .then((res) => { history.push(`/system/${system.id}/map/${res}`) })
    }


    const createHexes = (map) => {
        return map.map((xArray, xIndex) => {
            y += 1.51

            if (eachOther) {
                x = -22.22
                eachOther = false
            } else {
                x = -23.11
                eachOther = true
            }

            return (
                xArray.map((hexObject, yIndex) => {
                    x += 1.74
                    return (
                        <CreateMapHex
                            key={xIndex + yIndex + x + y}
                            pos={[x, 0.3, y]}
                            x={xIndex}
                            y={yIndex}
                            hexClickHandler={hexClickHandler}
                            action={action}
                        />
                    )
                }))
        })
    }


    return (
        <div className='CreateMapPageParentCont'>
            {loaded && system && level ?
                level === 1 ?
                    <div className='CreateMapParentCont'>


                        <div className='CanvasCont'>
                            <div className='CanvasHolder'>
                                <Canvas
                                    className="mapcanvas"
                                    camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 25.5, 0], rotation: [-(Math.PI / 2.0), 0.0, 0.0] }}
                                    gl={{ antialias: true }}
                                >
                                    <ambientLight />
                                    <pointLight position={[10, 10, 10]} />
                                    {createHexes(mapArray)}
                                </Canvas>
                            </div>
                        </div>


                        <div className='CreateMapFormCont'>
                            <button
                                className={action.type === '[RMV]' ? 'CreateMapFormRemoveSquares active' : 'CreateMapFormRemoveSquares'}
                                onClick={() => {
                                    action.type === '[RMV]' ? setAction({ type: null, body: {} }) : setAction({ type: '[RMV]', body: {} })
                                }}
                            >Remove Squares</button>

                            <input
                                className='CreateMapFormNameInput'
                                placeholder='Map Name'
                                type='text'
                                value={mapName}
                                onChange={(e) =>
                                    setMapName(e.target.value)} />


                            <select
                                className='CreateMapFormTypeSelect'
                                value={mapType}
                                onChange={(e) => setMapType(e.target.value)
                                }>
                                <option value='[PLT]' defaultValue>Planet</option>
                                <option value='[MON]'>Moon</option>
                                <option value='[AST]'>Asteroid</option>
                                <option value='[SHP]'>Ship</option>
                            </select>

                            <button
                                className='CreateMapFormCreateButton'
                                onClick={() => MapSubmitHandler()}
                            >Create Map</button>

                        </div>
                    </div>
                    :
                    <div className='LoadingTextCont'>
                        <div className='PermError createMapPage'>YOU DO NOT HAVE PERMISSION TO CREATE MAPS FOR THIS SYSTEM</div>
                    </div>
                :
                <div className='LoadingTextCont'>
                    <div className='LoadingText createMapPage'>Loading...</div>
                </div>
            }
            <img
                className='BackgroundImage'
                src={backgroundImage}
                loading='eager'
                alt='THE CRUSADE FLEETS© by Phil Moss; https://www.artstation.com/phil-moss' />
        </div>
    )
})


export default connect(state => ({
    system: state.systems.system,
    user: state.session.user,
    level: state.session?.permission?.level
}))(CreateMap)
