import { useRef, useState, memo, useEffect } from "react"
import { factionSwitch } from "../utils";

const Hex = ({ hexObject, pos, x, y, hexClickHandler, action }) => {

    const mesh = useRef()
    const [hovered, setHovered] = useState(false)
    const [color, setColor] = useState('black')

    console.log('render')

    useEffect(() => {
        if (hexObject.t) {
            setColor('white')
        }
    }, [setColor, hexObject.t])


    return (
        <>
            <mesh
                ref={mesh}
                position={pos}
                onPointerOver={() => {
                    if (action.type === '[CRTL]' && hexObject.t) {
                        setHovered(true)
                    }
                }}
                onPointerOut={() => {
                    setHovered(false)
                }}
                onClick={() => {
                    setColor(hexClickHandler(x, y, hexObject.t))
                }}
            >
                <cylinderBufferGeometry args={[0.92, 0.92, 0.001, 6]} />
                <meshBasicMaterial color={
                    hovered ?
                    action.body.color ?
                    action.body.color :
                    'green' :
                    color} />
            </mesh>


            {hexObject.t === '<CMD>' && <mesh  //TODO FINISH THESE
                position={pos}
            >
                <cylinderBufferGeometry args={[0.5, 0.5, 0.1, 4]} />
                <meshBasicMaterial color={'black'} />
            </mesh>}


            {hexObject.t === '<PWR>' && <mesh
                position={pos}
            >
                <cylinderBufferGeometry args={[0.5, 0.5, 0.1, 4]} />
                <meshBasicMaterial color={'orange'} />
            </mesh>}


            {hexObject.t === '<SLD>' && <mesh
                position={pos}
            >
                <cylinderBufferGeometry args={[0.5, 0.5, 0.1, 4]} />
                <meshBasicMaterial color={'orange'} />
            </mesh>}


            {hexObject.t === '<MAN>' && <mesh
                position={pos}
            >
                <cylinderBufferGeometry args={[0.5, 0.5, 0.1, 4]} />
                <meshBasicMaterial color={'orange'} />
            </mesh>}
        </>
    )
}

export default memo(Hex, (prevProps, nextProps) => prevProps.action === nextProps.action ? true : false)
