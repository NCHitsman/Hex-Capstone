import { useRef, useState } from "react"

const Hex = ({pos, x, y}) => {

    const mesh = useRef()
    const [hovered, setHover] = useState(false);
    const [color, setColor] = useState('#171717')
    const [visable, setVisable] = useState(false)
    const [clicked, setClicked] = useState(false)

    return (
        <>
            <mesh
            ref={mesh}
            position={pos}
            onPointerOver={(e) => {
                if (!clicked) {
                    setHover(true)
                    setVisable(true)
                }
            }}
            onPointerOut={(e) => {
                setHover(false)
                if (!clicked) {
                    setVisable(false)
                }
            }}
            onClick={() => {
                setColor('white')
                setClicked(true)
                setVisable(true)
            }}
            >
                <cylinderBufferGeometry attach='geometry' args={[0.92, 0.92, 0.001, 6]}/>
                <meshBasicMaterial color={hovered ? 'red' : color} visible={visable}/>
            </mesh>
        </>
    )
}


export default Hex
