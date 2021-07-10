import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSystemMaps, removeMap } from '../../store/maps'


const MapCard = ({ map, showRemove, systemId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div
            className='card mapCard'
            onClick={(e) => {
                if (e.target.id !== map.id) history.push(`/system/${systemId}/map/${map.id}`
                )
            }}
        >
            <div>{
            showRemove ?
            map.name.length > 14 ?
            map.name[13] === ' ' ?
            map.name.slice(0,13) + '...' :
            map.name.slice(0,14) + '...' :
            map.name
            :
            map.name.length > 17 ?
            map.name[16] === ' ' ?
            map.name.slice(0,16) + '...' :
            map.name.slice(0,17) + '...' :
            map.name}</div>
            {showRemove && <button
                className='SystemCardButton'
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
