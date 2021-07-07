import { useState, memo, useEffect } from "react"
import { factionSwitch } from "../utils"

const Hex = ({ hexObject, pos, x, y, hexClickHandler, action, ref }) => {

    const [hovered, setHovered] = useState(false)
    const [color, setColor] = useState('black')
    const [type, setType] = useState(hexObject.t)
    const [control, setControl] = useState(hexObject.c)
    const [extraHovered, setExtraHovered] = useState(false)

    useEffect(() => {
        if (hexObject.t) {
            setColor('white')
        }
        if (hexObject.c) {
            setColor(factionSwitch(hexObject.c)[1])
        }
    }, [setColor, hexObject])


    return (
        <>
            <mesh
                position={pos}
                onPointerOver={() => {
                    if (hexObject.t) {
                        if (action.type === '[CTRL]') {
                            setHovered(true)
                        } else if (action.type === '[CLR]') {
                            setHovered(true)
                            setColor('white')
                            setExtraHovered(true)
                        } else if (action.type) {
                            setExtraHovered(true)
                        }
                    }
                }}
                onPointerOut={() => {
                    setHovered(false)
                    setExtraHovered(false)
                }}
                onClick={() => {
                    if (hexObject.t) {
                        if (action.type === '[CTRL]') {
                            let [faction, color] = hexClickHandler(x, y, hexObject)
                            setColor(color)
                            setControl(faction)
                            return
                        }
                        if (hexObject.t === '<BLK>') {
                            switch (action.type) {
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
                                case ('[CLR]'):
                                    if (hexObject.c) {
                                        hexClickHandler(x, y, hexObject)
                                        setColor('white')
                                        setControl(null)
                                        setType('<BLK>')
                                    }
                                    break
                                default:
                                    return null
                            }
                        } else if (action.type === '[CLR]') {
                            hexClickHandler(x, y, hexObject)
                            setColor('white')
                            setControl(null)
                            setType('<BLK>')
                        }
                    }
                }}
            >
                <cylinderBufferGeometry args={[0.92, 0.92, 0.001, 6]} />
                <meshBasicMaterial color={
                    hovered ?
                        factionSwitch(action.body.faction)[1] :
                        control ?
                            factionSwitch(control)[1] :
                            color} />
            </mesh>


            {(type === '<CMD>' || action.type === '[CMD]') && <mesh  //TODO FINISH THESE
                position={pos}
            >
                <cylinderBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<CMD>') ? [0.5, 0.5, 0.1, 3] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<CMD>' ? action.type === '[CLR]' ? extraHovered ? 'white' : 'red' : 'red' : extraHovered ? 'red' : color} />
            </mesh>}


            {(type === '<PWR>' || action.type === '[PWR]') && <mesh
                position={pos}
                rotateX={1.8}
            >
                <cylinderBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<PWR>') ? [0.5, 0.5, 0.1, 4] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<PWR>' ? action.type === '[CLR]' ? extraHovered ? 'white' : 'orange' : 'orange' : extraHovered ? 'orange' : color} />
            </mesh>}


            {(type === '<SLD>' || action.type === '[SLD]') && <mesh
                position={pos}
            >
                <cylinderBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<SLD>') ? [0.45, 0.45, 0.1, 64] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<SLD>' ? action.type === '[CLR]' ? extraHovered ? 'white' : 'blue' : 'blue' : extraHovered ? 'blue' : color} />
            </mesh>}


            {(type === '<MAN>' || action.type === '[MAN]') && <mesh
                position={pos}
            >
                <boxBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<MAN>') ? [0.9, 0.1, 0.6] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<MAN>' ? action.type === '[CLR]' ? extraHovered ? 'white' : '#AA4465' : '#AA4465' : extraHovered ? '#AA4465' : color} />
            </mesh>}
        </>
    )
}

export default memo(Hex,
    (prevProps, nextProps) =>
        prevProps.action === nextProps.action
            ? true
            : false)
