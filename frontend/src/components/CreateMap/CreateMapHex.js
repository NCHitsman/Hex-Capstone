import { useRef, useState, memo } from "react"

const CreateMapHex = ({ pos, x, y, hexClickHandler, action }) => {

    const mesh = useRef()
    const [hovered, setHover] = useState(false);
    const [color, setColor] = useState('#1C1C1C')
    const [clicked, setClicked] = useState(false)
    const [hoveredColor, setHoveredColor] = useState('green')

    return (
        <>
            <mesh
                ref={mesh}
                position={pos}
                onPointerOver={(e) => {
                    switch (action.type) { // * ACTION TYPE SWITCH FOR SETTING HOVER COLOR
                        case '[RMV]':
                            if (clicked) {
                                setHoveredColor('red')
                                setHover(true)
                            }
                            break
                        default:
                            if (!clicked) {
                                setHover(true)
                                setHoveredColor('green')
                            }
                    }
                    if (e.buttons === 1) {
                        switch (action.type) {  // * ACTION TYPE SWITCH FOR SETTING BASE COLOR AND CLICKED
                            case ('[RMV]'):
                                setColor('#1C1C1C')
                                setClicked(false)
                                break
                            default:
                                setColor('white')
                                setClicked(true)
                        }
                        hexClickHandler(x, y)
                    }
                }}
                onPointerOut={() => {
                    setHover(false)
                }}
                onPointerDown={(e) => {
                    if (e.buttons === 1) {
                        switch (action.type) {  // * ACTION TYPE SWITCH FOR SETTING BASE COLOR AND CLICKED
                            case ('[RMV]'):
                                setColor('#1C1C1C')
                                setClicked(false)
                                break
                            default:
                                setColor('white')
                                setClicked(true)
                        }
                        hexClickHandler(x, y)
                    }
                }}
            >
                <cylinderBufferGeometry attach='geometry' args={[0.92, 0.92, 0.001, 6]} />
                <meshBasicMaterial color={hovered ? hoveredColor : color} />
            </mesh>
        </>
    )
}

export default memo(CreateMapHex, (prevProps, nextProps) => prevProps.action === nextProps.action ? true : false)
