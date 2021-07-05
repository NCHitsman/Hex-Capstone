import { HexGrid, Layout, Pattern } from 'react-hexgrid';
import './CreateMap.css'
import Hex from './Hex';


const CreateMap = () => {

    const array = []
    let counter = 0

    for (let i = 1; i <= 25; i++) {
        let x = []
        for (let j = 1; j <= 25; j++) {
            x.push([])
        }
        array.push(x)
    }

    return (
        <>

            {/* {array.map((a, i) => {
                counter += .5
                return (
                    a.map((b, j) => {
                        return (
                            <>
                            <Hex key={[i,j]} q={i-12} r={(j - 5) - Math.ceil(counter)} />
                            </>
                        )
                    })
                )
            })} */}
        </>
    )
}


export default CreateMap
