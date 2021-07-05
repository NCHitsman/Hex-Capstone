import './CreateMap.css'
import {Canvas} from '@react-three/fiber'
import Hex from './Hex'
import {range} from 'lodash'
import { useState } from 'react'


const CreateMap = () => {
    const [mapArray, setMapArray] = useState(range(25).map(() => range(25)))

    let x = -21.42
    let y = -19.63
    let eachOther = true


    const hexClickHandler = (x, y) => {
        let copy = [...mapArray]
        copy[x][y] = 'CLICKED'
        setMapArray(copy)
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
                {mapArray.map((b,i) => {
                    y += 1.51

                    if (eachOther) {
                        x = -21.42
                        eachOther = false
                    } else {
                        x = -22.31
                        eachOther = true
                    }

                    return (
                    b.map((l,p) => {
                        x += 1.74
                        return (
                            <Hex key={i+p+x+y} pos={[x, 0.3, y]} x={i} y={p} hexClickHandler={hexClickHandler}/>
                        )
                    }))
                })}
            </Canvas>
        </>
    )
}


export default CreateMap
