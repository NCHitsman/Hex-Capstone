import { useSelector, connect } from 'react-redux'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import {getUserSystems, clearCurrentSystem} from '../../store/systems'
import { clearMaps } from '../../store/maps'
import SystemCard from './SystemCard'
import './Home.css'
import NewSystemForm from './NewSystemForm'


const LoggedInHome = ({user, systems}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            dispatch(getUserSystems(user.id))
            dispatch(clearMaps())
            dispatch(clearCurrentSystem())
        }
    }, [dispatch, user])

    const currentSystems = useSelector(state=>state.systems.userSystems)

    return (
        <div>
            {currentSystems ?
            <div className='systemCard__cont'>
                <div className='systemCard__cont__title'>
                    Your Systems:
                </div>
                {currentSystems && Object.values(currentSystems).map((system, i)=>(
                    <SystemCard key={i} system={system} />
                ))}
                <div>
                    <NewSystemForm user={user} />
                </div>
            </div>
            :
            <div>Loading...</div>
            }
        </div>
    )
}

export default connect(state=>({systems:state.systems}))(LoggedInHome)
