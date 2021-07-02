import './Home.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeSystem, acceptInvite, declineInvite } from '../../store/systems'

const SystemCard = ({system, user, pend}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const acceptInviteClickHandler = (e) => {
        e.stopPropagation()
        dispatch(acceptInvite(user.id, system.id))
    }

    const declineInviteClickHandler = (e) => {
        e.stopPropagation()
        dispatch(declineInvite(user.id, system.id))
    }

    return (
        <div
        className='card'
        onClick={(e) => {
            if (e.target.id !== system.id) history.push(`/system/${system.id}`
            )}}
        >
            <div>{system.name}</div>
            {system.owner_id === user.id ? <button
                id={system.id}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(removeSystem(system.id))
                    }}
            >Delete</button>
            : pend &&
            <>
                <button
                onClick={(e) => acceptInviteClickHandler(e)}
                >Accept</button>
                <button
                onClick={(e) => declineInviteClickHandler(e)}
                >Decline
                </button>
            </>
            }
        </div>
    )
}

export default SystemCard
