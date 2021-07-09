import './Home.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeSystem, acceptInvite, declineInvite } from '../../store/systems'

const SystemCard = ({system, user, pend, level, edit}) => {
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
            {system.owner_id === user.id && edit ? <button
                className={'SystemCardButton'}
                id={system.id}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(removeSystem(system.id))
                    }}
            >Delete</button>
            : pend &&
            <>
                <button
                className={'SystemCardButton'}
                onClick={(e) => acceptInviteClickHandler(e)}
                >Accept</button>
                <button
                className={'SystemCardButton'}
                onClick={(e) => declineInviteClickHandler(e)}
                >Decline
                </button>
            </>
            }
            {system.owner_id !== user.id &&
            <div>{level === 2 ? 'Captain' : 'Player'}</div>
            }
        </div>
    )
}

export default SystemCard
