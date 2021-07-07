import { useState, memo, useEffect } from "react"
import { factionSwitch } from "../utils"

const Hex = ({ hexObject, pos, x, y, hexClickHandler, action, ref }) => {

    const [hovered, setHovered] = useState(false)
    const [color, setColor] = useState('black')
    const [type, setType] = useState(hexObject.t)

    useEffect(() => {
        if (hexObject.t) {
            setColor('white')
        }
    }, [setColor, hexObject.t])

    console.log(hexObject.t)

    return (
        <>
            <mesh
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
                    switch (action.type) {
                        case ('[CRTL]'):
                            setColor(hexClickHandler(x, y, hexObject))
                            break
                        case ('[CMD]'):
                            setType(hexClickHandler(x, y, hexObject))
                            break
                        case ('[PWR]'):
                            setType(hexClickHandler(x, y, hexObject))
                            break
                        case ('[SLD]'):
                            setType(hexClickHandler(x, y, hexObject))
                            break
                        case ('[MAN]'):
                            setType(hexClickHandler(x, y, hexObject))
                            break
                        default:
                            return null
                    }
                }}
            >
                <cylinderBufferGeometry args={[0.92, 0.92, 0.001, 6]} />
                <meshBasicMaterial color={
                    hovered ?
                        'green' :
                        hexObject.c ?
                            factionSwitch(hexObject.c)[1] :
                            color} />
            </mesh>


            {type === '<CMD>' && <mesh  //TODO FINISH THESE
                position={pos}
            >
                <cylinderBufferGeometry args={[0.5, 0.5, 0.1, 3]} />
                <meshBasicMaterial color={'red'} />
            </mesh>}


            {type === '<PWR>' && <mesh
                position={pos}
                rotateX={1.8}
            >
                <cylinderBufferGeometry args={[0.5, 0.5, 0.1, 4]} />
                <meshBasicMaterial color={'orange'} />
            </mesh>}


            {type === '<SLD>' && <mesh
                position={pos}
            >
                <cylinderBufferGeometry args={[0.45, 0.45, 0.1, 64]} />
                <meshBasicMaterial color={'blue'} />
            </mesh>}


            {type === '<MAN>' && <mesh
                position={pos}
            >
                <boxBufferGeometry args={[0.9, 0.1, 0.6]} />
                <meshBasicMaterial color={'#AA4465'} />
            </mesh>}
        </>
    )
}

export default memo(Hex,
    (prevProps, nextProps) => prevProps.action === nextProps.action
        ? true
        : false)
