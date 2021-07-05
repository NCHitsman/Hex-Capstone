import './CreateMap.css'
import {Canvas} from '@react-three/fiber'
import Hex from './Hex'
import {range} from 'lodash'


const CreateMap = () => {

    const mapSizeArray = range(25).map(() => range(25))

    let x = -23.62
    let y = -19.63
    let eachOther = true

    return (
        <>
            <Canvas
            className="WorldCanvas"
            camera={{ fov: 75, near: 0.1, far: 1000, position: [(90 * Math.PI) / 180, 30, 0] }}
            >
                {/* <axesHelper /> */}
                {/* <gridHelper args={[50, 50]} position={[0,0,0]} /> */}
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {mapSizeArray.map((b,i) => {
                    y += 1.51

                    if (eachOther) {
                        x = -23.62
                        eachOther = false
                    } else {
                        x = -24.51
                        eachOther = true
                    }

                    return (
                    b.map((l,p) => {
                        x += 1.74
                        return (
                            <Hex key={i+p+x+y} pos={[x, 0.3, y]} x={i} y={p}/>
                        )
                    }))
                })}
            </Canvas>
        </>
    )
}


export default CreateMap
