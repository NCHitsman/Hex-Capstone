import './CreateMap.css'
import { Canvas } from '@react-three/fiber'
import CreateMapHex from './CreateMapHex'
import { range } from 'lodash'
import { useState, memo } from 'react'
import { createMap } from '../../store/maps'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { OrbitControls } from '@react-three/drei'


const CreateMap = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [mapArray, setMapArray] = useState(range(25).map(() => range(25)))
    const [action, setAction] = useState({ type: null, body: {} })
    const [mapName, setMapName] = useState('')
    const [mapType, setMapType] = useState('[PLT]')

    let x = -21.92
    let y = -19.63
    let eachOther = true

    const system = useSelector(state => state.systems.system)

    const hexClickHandler = (x, y) => {
        switch (action.type) {
            case '[RMV]':
                mapArray[x][y] = y
                setMapArray(mapArray)
                break
            default:
                mapArray[x][y] = {t: '<BLK>', c: null}
                setMapArray(mapArray)
        }
    }

    const MapSubmitHandler = () => {
        dispatch(createMap(mapName, mapType, system.id, 25, mapArray))
        .then((res) => {history.push(`/system/${system.id}/map/${res}`)})
    }


    return (
        <div className='CreateMapPageParentCont'>
            {system ? <div className='createmap__parent__cont'>
                <Canvas
                    className="mapcanvas"
                    camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 30, 0], rotation: [-(Math.PI / 2.0), 0.0, 0.0] }}
                    gl={{ antialias: true }}
                >
                    <ambientLight />
                    <OrbitControls enableRotate={false}/>
                    <pointLight position={[10, 10, 10]} />
                    {mapArray.map((xArray, xIndex) => {
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
                                    action={action} />
                                )
                            }))
                    })}
                </Canvas>
                <div className='mapform__cont'>
                    <button
                        onClick={() => {
                            action.type === '[RMV]' ? setAction({ type: null, body: {} }) : setAction({ type: '[RMV]', body: {} })
                        }}
                    >{action.type === '[RMV]' ? 'Place Squares' : 'Remove Squares'}</button>
                    <label>
                        Map Name:
                        <input type='text' value={mapName} onChange={(e) => setMapName(e.target.value)} />
                    </label>
                    <label>
                        Map Type:
                        <select value={mapType} onChange={(e) => setMapType(e.target.value)}>
                            <option value='[PLT]' defaultValue>Planet</option>
                            <option value='[MON]'>Moon</option>
                            <option value='[AST]'>Asteroid</option>
                            <option value='[SHP]'>Ship</option>
                        </select>
                    </label>
                    <button
                    onClick={() => MapSubmitHandler()}
                    >Create Map</button>

                </div>
            </div>
            :
            history.push('/')
            }
        </div>
    )
}


export default memo(CreateMap)
