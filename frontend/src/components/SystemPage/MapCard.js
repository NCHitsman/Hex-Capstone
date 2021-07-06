import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSystemMaps, removeMap } from '../../store/maps'


const MapCard = ({ map, showRemove, systemId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div
            className='card'
            onClick={(e) => {
                if (e.target.id !== map.id) history.push(`/system/${systemId}/map/${map.id}`
                )
            }}
        >
            <div>{map.name}</div>
            {showRemove && <button
                id={map.id}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(removeMap(map.id))
                    .then(() => dispatch(getSystemMaps(systemId)))
                }}
            >Delete</button>}
        </div>
    )
}


export default MapCard
