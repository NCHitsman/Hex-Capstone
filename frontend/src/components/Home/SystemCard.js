import './Home.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeSystem } from '../../store/systems'

const SystemCard = ({system}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div
        className='card'
        onClick={(e) => {
            if (e.target.id !== system.id) history.push(`/system/${system.id}`
            )}}
        >
            <div>{system.name}</div>
            <button
                id={system.id}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(removeSystem(system.id))
                    }}
            >Delete</button>
        </div>
    )
}

export default SystemCard
