import { useRef, useState, memo, useEffect } from "react"

const Hex = ({hexObject, pos, x, y, hexClickHandler, action }) => {

    const mesh = useRef()
    const [hovered] = useState(false);
    const [color, setColor] = useState('gray')
    const [hoveredColor] = useState('green')


    console.log('render')

    useEffect(() => {
        if (hexObject.t) {
            switch (hexObject.t){
                default:
                    setColor('white')
            }
        }
    }, [setColor, hexObject.t])


    return (
        <>
            <mesh
                ref={mesh}
                position={pos}
                onPointerOver={() => {
                    // setHover(true)
                }}
                onPointerOut={() => {
                    // setHover(false)
                }}
                onClick={() => {
                    console.log(hexObject)
                    // hexClickHandler(x, y)
                }}
            >
                <cylinderBufferGeometry attach='geometry' args={[0.92, 0.92, 0.001, 6]} />
                <meshBasicMaterial color={ hovered ? hoveredColor : color} />
            </mesh>
        </>
    )
}

export default memo(Hex, (prevProps, nextProps) => prevProps.action === nextProps.action ? true : false)
