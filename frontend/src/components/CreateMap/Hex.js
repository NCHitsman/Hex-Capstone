import { useRef, useState, memo, useEffect } from "react"

const Hex = ({ pos, x, y, hexClickHandler, action }) => {

    const mesh = useRef()
    const [hovered, setHover] = useState(false);
    const [color, setColor] = useState('#1C1C1C')
    const [clicked, setClicked] = useState(false)
    const [hoveredColor, setHoveredColor] = useState('green')

    useEffect(() => {
        switch (action.type) { // * ACTION TYPE SWITCH FOR SETTING HOVER COLOR
            case '[RMV]':
                setHoveredColor('red')
                break
            default:
                setHoveredColor('green')
        }
    }, [action, setHoveredColor])

    console.log('render')

    return (
        <>
            <mesh
                ref={mesh}
                position={pos}
                onPointerOver={() => {
                    if (action.type === '[RMV]' || !clicked) {
                        setHover(true)
                    }
                }}
                onPointerOut={() => {
                    setHover(false)
                }}
                onClick={() => {
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
                }}
            >
                <cylinderBufferGeometry attach='geometry' args={[0.92, 0.92, 0.001, 6]} />
                <meshBasicMaterial color={hovered ? hoveredColor : color} />
            </mesh>
        </>
    )
}

export default memo(Hex)
