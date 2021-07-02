import { useSelector, connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserSystems, clearCurrentSystem, clearSystemUsers, getInvitedSystems } from '../../store/systems'
import { clearMaps } from '../../store/maps'
import SystemCard from './SystemCard'
import './Home.css'
import NewSystemForm from './NewSystemForm'


const Home = ({ user, systems }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserSystems(user.id))
        dispatch(getInvitedSystems(user.id))
        dispatch(clearCurrentSystem())
        dispatch(clearSystemUsers())
        dispatch(clearMaps())
    }, [dispatch, user])

    const currentSystems = useSelector(state => state.systems.userSystems)
    const invitedSystems = useSelector(state => state.systems.invitedSystems)

    return (
        <div>
            {currentSystems ?
                <div className='systemCard__cont'>
                    <div className='systemCard__cont__title'>
                        Your Systems:
                    </div>
                    {currentSystems && Object.values(currentSystems).map((system, i) => (
                        <SystemCard key={i} system={system} user={user} />
                    ))}
                    <div>
                        <NewSystemForm user={user} />
                    </div>
                    <div className='systemCard__cont__title'>Invited Systems:</div>
                    {invitedSystems && Object.keys(invitedSystems).length > 0 &&
                        Object.values(invitedSystems).map((system, i) => (
                            <SystemCard key={i} system={system.System} user={user} pend={system.status === '[ACPT]' ? false : true} />
                        ))}
                </div>

                :
                <div>Loading...</div>
            }
        </div>
    )
}

export default connect(state => ({ systems: state.systems }))(Home)
