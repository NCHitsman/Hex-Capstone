import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { connect, useDispatch } from 'react-redux'
import { getSystem, getSystemUsers, inviteUser, getInvitedSystems, leaveSystem } from "../../store/systems"
import { getSystemMaps } from "../../store/maps"
import MapCard from "./MapCard"
import { useHistory } from 'react-router-dom'
import SystemUsers from "./SystemUsers/SystemUsers"
import { getPermission } from "../../store/session"
import './SystemPage.css'
import Teams from './Teams/Teams'
import { getTeams, getTeamPlayers } from "../../store/teams"
import CreateTeamForm from './CreateTeamForm/CreateTeamForm'
import backgroundImage from '../../images/shipwarp2background.png'


const SystemPage = ({ user, maps, systems, teams, level }) => {
    const { systemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [invitee, setInvitee] = useState('')
    const [NewUserLevel, setNewUserLevel] = useState('3')
    const [error, setError] = useState('')
    const [loadedPlayers, setLoadedPlayers] = useState(false)
    const [showRemove, setShowRemove] = useState(false)

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true)
        }, 600)
        return () => {
            clearTimeout(timeout)
        }
    })

    useEffect(() => {
        dispatch(getSystem(systemId)).then(res => {
            if (!res) {
                history.push('/')
                throw new Error()
            }
        }).then(res => {
            dispatch(getSystemMaps(systemId))
            dispatch(getSystemUsers(systemId))
            dispatch(getPermission(user.id, systemId))
            dispatch(getTeams(systemId))
                .then(() => dispatch(getTeamPlayers(systemId)))
                .then(() => setLoadedPlayers(true))
        }).catch(err => { })
    }, [dispatch, systemId, user.id, history])

    const inviteUserHandler = () => {
        dispatch(inviteUser(invitee, NewUserLevel, systemId))
            .then(res => {
                if (res === 'NOT FOUND' || res === 'ALREADY INVITED') {
                    setError(res)
                } else {
                    setInvitee('')
                }
            })
        setError('')
    }

    const leaveSystemClickHandler = () => {
        dispatch(leaveSystem(user.id, systems.system.id))
        dispatch(getInvitedSystems(user.id))
        history.push('/')
    }


    return (
        <div className='SystemPageFlex'>
            {loaded && maps.systemMaps && systems.system && systems.systemUsers && teams.players && loadedPlayers ?
                level ?
                    <div className='SystemPageParentCont'>




                        <div className='MapCardCont'>

                            <div className='MapCardTitleCont'>

                                <div className='MapCardButtonCont edit'>
                                    {level <= 1 && <button
                                        className={showRemove ? 'MapCardTitleEditButton remove' : 'MapCardTitleEditButton'}
                                        onClick={() => showRemove ? setShowRemove(false) : setShowRemove(true)}
                                    >Edit</button>}
                                </div>

                                <div className='MapCardTilte'>
                                    Worlds in {systems.system?.name}:
                                </div>

                                <div className='MapCardButtonCont create'>
                                    {level <= 1 ? <button
                                        style={{ border: Object.values(maps.systemMaps).length ? 'border: 1px solid black' : '3px solid red' }}
                                        className='MapCardCreateNewWorldButton'
                                        onClick={() => history.push(`/system/${systemId}/createMap`)}
                                    >Create New Map</button>
                                        :
                                        <button
                                            className='MapCardCreateNewWorldButton'
                                            onClick={() => leaveSystemClickHandler()}
                                        >Leave System</button>
                                    }
                                </div>


                            </div>

                            <div className='MapsCont'>
                                {Object.values(maps.systemMaps).map((map, i) => (
                                    <MapCard key={i} map={map} showRemove={showRemove} systemId={systemId} />
                                ))}
                            </div>

                        </div>




                        <div className='UserTeamFlexCont'>


                            <div className='UserFlexCont'>


                                <SystemUsers systemUsers={systems.systemUsers} system={systems.system} showRemove={showRemove} currentUser={user} teams={teams} />



                                {level <= 1 &&
                                    <div className='InviteUserCreateTeamFormCont'>
                                        <div className='InviteUserCreateTeamFormError'>{error}</div>
                                        <label className='InviteUserCreateTeamFormTitle'>Invite User:</label>
                                        <input
                                            placeholder='Username'
                                            className='InviteUserCreateTeamFormInput'
                                            value={invitee}
                                            onChange={(e) => setInvitee(e.target.value)}
                                        ></input>
                                        <select
                                            className='InviteUserCreateTeamFormSelect'
                                            value={NewUserLevel}
                                            onChange={(e) => setNewUserLevel(e.target.value)}
                                        >
                                            <option value='3'>Player</option>
                                            <option value='2'>Captain</option>
                                        </select>
                                        <button
                                            className='InviteUserCreateTeamFormButton'
                                            onClick={() => inviteUserHandler()}
                                        >Invite</button>
                                        <div></div>
                                    </div>
                                }
                            </div>

                            <div className='TeamFlexCont'>

                                {teams.players && <Teams
                                    teams={teams}
                                    user={user}
                                    systemUsers={systems.systemUsers}
                                    system={systems.system}
                                    players={teams.players}
                                    edit={showRemove}
                                />
                                }

                                {level <= 2 && <CreateTeamForm user={user} system={systems.system} teams={Object.values(teams).length > 1} />}
                            </div>
                        </div>



                    </div>
                    :
                    <div className='LoadingTextCont'>
                        <div className='PermError'>YOU DO NOT HAVE PERMISSION TO VIEW THIS SYSTEM</div>
                    </div>
                :
                <div className='LoadingTextCont'>
                    <div className='LoadingText systemPage'>Loading...</div>
                </div>
            }
            <img className='BackgroundImage' src={backgroundImage} loading='eager' alt='Warhammer 40K Nebula© by jordi van hees; https://www.artstation.com/artwork/W294dN' />
        </div>
    )
}

export default connect(state => ({
    maps: state.maps,
    systems: state.systems,
    session: state.session,
    teams: state.teams,
    level: state.session?.permission?.level
}))(SystemPage)
