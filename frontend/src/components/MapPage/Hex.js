import { useState, memo, useEffect } from "react"
import { factionSwitch } from "../utils"

const Hex = ({ hexObject, pos, x, y, hexClickHandler, action }) => {

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
                <cylinderBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<CMD>') ? [0.55, 0.55, 0.1, 4] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<CMD>' ? action.type === '[CLR]' ? extraHovered ? 'white' : '#323334' : '#323334' : extraHovered ? '#323334' : color} />
            </mesh>}


            {(type === '<PWR>' || action.type === '[PWR]') && <mesh
                position={[pos[0], 0.3, pos[2] + 0.07]}
                rotation-x={Math.PI}
            >
                <cylinderBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<PWR>') ? [0.6, 0.6, 0.1, 3] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<PWR>' ? action.type === '[CLR]' ? extraHovered ? 'white' : '#FFCE47' : '#FFCE47' : extraHovered ? '#FFCE47' : color} />
            </mesh>}


            {(type === '<SLD>' || action.type === '[SLD]') && <mesh
                position={pos}
            >
                <cylinderBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<SLD>') ? [0.5, 0.5, 0.1, 64] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<SLD>' ? action.type === '[CLR]' ? extraHovered ? 'white' : '#188C7C' : '#188C7C' : extraHovered ? '#188C7C' : color} />
            </mesh>}


            {(type === '<MAN>' || action.type === '[MAN]') && <mesh
                position={pos}
            >
                <boxBufferGeometry args={(hexObject.t === '<BLK>' || hexObject.t === '<MAN>') ? [0.95, 0.2, 0.6] : [0, 0, 0]} />
                <meshBasicMaterial color={type === '<MAN>' ? action.type === '[CLR]' ? extraHovered ? 'white' : '#5A202E' : '#5A202E' : extraHovered ? '#5A202E' : color} />
            </mesh>}
        </>
    )
}

export default memo(Hex,
    (prevProps, nextProps) =>
        prevProps.action === nextProps.action
            ? true
            : false)
