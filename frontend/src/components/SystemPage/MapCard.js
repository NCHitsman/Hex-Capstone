import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const MapCard = ({map}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div
        className='card'
        onClick={(e) => {
            if (e.target.id !== map.id) history.push(`/map/${map.id}`
            )}}
        >
            <div>{map.name}</div>
            <button
                id={map.id}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch()
                    }}
            >Delete</button>
        </div>
    )
}


export default MapCard
