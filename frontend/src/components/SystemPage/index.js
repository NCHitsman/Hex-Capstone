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

const SystemPage = ({ user, maps, systems, session, teams, level }) => {
    const { systemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [invitee, setInvitee] = useState('')
    const [NewUserLevel, setNewUserLevel] = useState('3')
    const [error, setError] = useState('')
    const [loadedPlayers, setLoadedPlayers] = useState(false)
    const [showRemove, setShowRemove] = useState(false)

    useEffect(() => {
        dispatch(getSystem(systemId))
        dispatch(getSystemMaps(systemId))
        dispatch(getSystemUsers(systemId))
        dispatch(getPermission(user.id, systemId))
        dispatch(getTeams(systemId))
        .then(() => dispatch(getTeamPlayers(systemId)))
        .then(() => setLoadedPlayers(true))
    }, [dispatch, systemId, user.id])

    const inviteUserHandler = () => {
        dispatch(inviteUser(invitee, NewUserLevel, systemId))
            .then(res => {
                if (res === 'NOT FOUND' || res === 'ALREADY INVITED') {
                    setError(res)
                } else {
                    setInvitee('')
                }})
        setError('')
    }

    const leaveSystemClickHandler = () => {
        dispatch(leaveSystem(user.id, systems.system.id))
        dispatch(getInvitedSystems(user.id))
        history.push('/')
    }

    return (
        <div className='SystemPageParentCont'>
            {maps.systemMaps && systems.system && systems.systemUsers && teams.players && level && loadedPlayers ?
                level ?
                    <div className='systemPage__parent__cont'>
                        <div className='systemCard__cont'>
                            <div className='systemCard__cont__title'>
                                Worlds in {systems.system?.name}:
                            </div>

                            {level <= 1 && <button
                                onClick={() => showRemove ? setShowRemove(false) : setShowRemove(true)}
                            >Edit:</button>}

                            {Object.values(maps.systemMaps).map((map, i) => (
                                <MapCard key={i} map={map} showRemove={showRemove} systemId={systemId}/>
                            ))}

                            {level <= 1 ? <button
                                onClick={() => history.push('/createMap')}
                            >Create New Map</button>
                                :
                                <div>.</div>
                            }

                            <div>.</div>
                            <div>.</div>
                            <div>.</div>

                            <SystemUsers systemUsers={systems.systemUsers} system={systems.system} showRemove={showRemove} currentUser={user} teams={teams}/>

                            <div>.</div>
                            <div>.</div>
                            <div>.</div>

                            {level <= 1 &&
                                <>
                                    <div>{error}</div>
                                    <label>Invite User:
                                        <input
                                            value={invitee}
                                            onChange={(e) => setInvitee(e.target.value)}
                                        ></input>
                                    </label>
                                    <select
                                        value={NewUserLevel}
                                        onChange={(e) => setNewUserLevel(e.target.value)}
                                    >
                                        <option value='3'>Player</option>
                                        <option value='2'>Captain</option>
                                    </select>
                                    <button
                                        onClick={() => inviteUserHandler()}
                                    >Invite</button>

                                    <div>.</div>
                                    <div>.</div>
                                    <div>.</div>

                                    <CreateTeamForm user={user} system={systems.system}/>


                                    <div>.</div>
                                    <div>.</div>
                                    <div>.</div>
                                </>
                            }

                            {user.id !== systems.system.owner_id &&
                                <button
                                    onClick={() => leaveSystemClickHandler()}
                                >Leave System</button>}
                        </div>
                        {teams.players && <Teams
                        teams={teams}
                        user={user}
                        systemUsers={systems.systemUsers}
                        system={systems.system}
                        players={teams.players}/>}
                    </div>
                    :
                    <div>DO NOT HAVE PERMISSION</div>
                :
                <div>Loading...</div>
            }
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
