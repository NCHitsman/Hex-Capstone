import './CreateMap.css'
import { Canvas } from '@react-three/fiber'
import Hex from './Hex'
import { range } from 'lodash'
import { useState, memo } from 'react'


const CreateMap = () => {
    const [mapArray, setMapArray] = useState(range(25).map(() => range(25)))
    const [action, setAction] = useState({ type: null, body: {} })

    let x = -21.42
    let y = -19.63
    let eachOther = true


    const hexClickHandler = (x, y) => {
        switch (action.type) {
            case '[RMV]':
                mapArray[x][y] = y
                setMapArray(mapArray)
                break
            default:
                mapArray[x][y] = 'CLICKED'
                setMapArray(mapArray)
        }
        console.log(mapArray)
    }


    return (
        <>
            <Canvas
                className="WorldCanvas"
                camera={{ fov: 75, near: 0.1, far: 1000, position: [Math.PI / -2, 30, 0] }}
            >
                <ambientLight />
                {/* <gridHelper args={[50,50]}/> */}
                <pointLight position={[10, 10, 10]} />
                {mapArray.map((xArray, xArrayIndex) => {
                    y += 1.51

                    if (eachOther) {
                        x = -21.42
                        eachOther = false
                    } else {
                        x = -22.31
                        eachOther = true
                    }

                    return (
                        xArray.map((yArray, yArrayIndex) => {
                            x += 1.74
                            return (
                                <Hex key={xArrayIndex + yArrayIndex + x + y} pos={[x, 0.3, y]} x={xArrayIndex} y={yArrayIndex} hexClickHandler={hexClickHandler} action={action} />
                            )
                        }))
                })}
            </Canvas>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <button
                onClick={() => {
                    action.type === '[RMV]' ? setAction({ type: null, body: {} }) : setAction({ type: '[RMV]', body: {} })
                }}
            >{action.type === '[RMV]' ? 'Place Squares' : 'Remove Squares'}</button>
        </>
    )
}


export default memo(CreateMap)
