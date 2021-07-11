import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserSystems, clearCurrentSystem, clearSystemUsers, getInvitedSystems } from '../../store/systems'
import { clearMaps } from '../../store/maps'
import { clearTeams } from '../../store/teams'
import { clearPermission } from '../../store/session'
import SystemCard from './SystemCard'
import './Home.css'
import NewSystemForm from './NewSystemForm'
import backgroundImage from '../../images/shipoutofwarpbackground.png'


const Home = ({ user, systems }) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1000)
    })

    useEffect(() => {
        dispatch(getUserSystems(user.id))
        dispatch(getInvitedSystems(user.id))
        dispatch(clearCurrentSystem())
        dispatch(clearSystemUsers())
        dispatch(clearMaps())
        dispatch(clearTeams())
        dispatch(clearPermission())
    }, [dispatch, user])


    return (
        <div className='HomeParentCont'>
            {loaded && systems.userSystems && systems.invitedSystems ?
                <div className='SystemCardParentCont'>

                    <div className='SystemCardSectionCont'>
                        <div className='SystemCardCont'>
                            <div className='SystemCardContTitleHolder'>
                                <div className='SystemCardContTitle'>
                                    Your Systems:
                                </div>
                                <button
                                className={edit ? 'SystemCardContTitleEditButton clicked' : 'SystemCardContTitleEditButton'}
                                onClick={() => edit ? setEdit(false) : setEdit(true)}
                                >Edit</button>
                            </div>
                            <div className='SystemCardHolder'>
                                {Object.values(systems.userSystems).map((system, i) => (
                                    <SystemCard key={i} system={system} user={user} edit={edit} />
                                ))}
                            </div>
                        </div>


                        <div className='SystemCardCont'>
                            <div className='SystemCardContTitle'>Invited Systems:</div>
                            <div className='SystemCardHolder'>
                                {Object.keys(systems.invitedSystems).length > 0 &&
                                    Object.values(systems.invitedSystems).map((system, i) => (
                                        <SystemCard key={i} system={system.System} user={user} pend={system.status === '[ACPT]' ? false : true} level={system.level} />
                                    ))}
                            </div>
                        </div>

                    </div>

                    <NewSystemForm user={user} />

                </div>
                :
                <div className='LoadingTextCont'>
                    <div className='LoadingText'>Loading...</div>
                </div>
            }
            <img
            className='BackgroundImage'
            src={backgroundImage}
            alt='Warhammer 40K Nebula© by jordi van hees; https://www.artstation.com/artwork/W294dN' />
        </div>
    )
}

export default connect(state => ({ systems: state.systems }))(Home)
