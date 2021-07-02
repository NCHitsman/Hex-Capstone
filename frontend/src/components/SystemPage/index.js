import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { connect, useDispatch, useSelector } from 'react-redux'
import { getSystem, getSystemUsers, inviteUser, removeUser, getInvitedSystems } from "../../store/systems"
import { getSystemMaps } from "../../store/maps"
import MapCard from "./MapCard"
import { useHistory } from 'react-router-dom'
import SystemUsers from "./SystemUsers/SystemUsers"
import { getPermission } from "../../store/session"
import './SystemPage.css'
import Teams from './Teams/Teams'

const SystemPage = ({ user, maps, systems, session }) => {
    const { systemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [invitee, setInvitee] = useState('')
    const [level, setLevel] = useState('4')
    const [error, setError] = useState('')
    const [showRemove, setShowRemove] = useState(false)

    useEffect(() => {
        dispatch(getSystem(systemId))
        dispatch(getSystemMaps(systemId))
        dispatch(getSystemUsers(systemId))
        dispatch(getPermission(user.id, systemId))
    }, [dispatch, systemId, user.id])

    const currentSystem = useSelector(state => state.systems.system)
    const systemMaps = useSelector(state => state.maps.systemMaps)
    const systemUsers = useSelector(state => state.systems.systemUsers)
    const permissionLevel = useSelector(state => state.session.permission?.level)

    const inviteUserHandler = () => {
        dispatch(inviteUser(invitee, level, systemId))
        .then(res => res === 'NOT FOUND' ?
        setError('NOT FOUND')
        :
        setInvitee(''))
        setError('')
    }

    const leaveSystemClickHandler = () => {
        dispatch(removeUser(user.id, currentSystem.id))
        dispatch(getInvitedSystems(user.id))
        history.push('/')
    }

    return (
        <div>
            {systemMaps && currentSystem && systemUsers ?
                permissionLevel ?
                <div className='systemPage__parent__cont'>
                    <div className='systemCard__cont'>
                        <div className='systemCard__cont__title'>
                            Worlds in {currentSystem?.name}:
                        </div>

                        {permissionLevel <= 2 && <button
                        onClick={() => showRemove ? setShowRemove(false) : setShowRemove(true)}
                        >Edit:</button>}

                        {Object.values(systemMaps).map((map, i) => (
                            <MapCard key={i} map={map} showRemove={showRemove} />
                        ))}

                        {permissionLevel <= 2 ? <button
                            onClick={() => history.push('/createMap')}
                            >Create New Map</button>
                            :
                            <div>.</div>
                        }

                        <div>.</div>
                        <div>.</div>
                        <div>.</div>

                        <SystemUsers systemUsers={systemUsers} system={currentSystem} showRemove={showRemove} currentUser={user}/>

                        <div>.</div>
                        <div>.</div>
                        <div>.</div>

                        {permissionLevel <= 2 &&
                        <>
                            <div>{error}</div>
                            <label>Invite User:
                                <input
                                value={invitee}
                                onChange={(e) => setInvitee(e.target.value)}
                                ></input>
                            </label>
                            <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            >
                                <option value='4'>Viewer</option>
                                <option value='3'>Editor</option>
                                <option value='2'>Co-Owner</option>
                            </select>
                            <button
                            onClick={() => inviteUserHandler()}
                            >Invite</button>
                        </>
                        }

                        {user.id !== currentSystem.owner_id &&
                            <button
                            onClick={() => leaveSystemClickHandler()}
                            >Leave System</button>}
                    </div>
                    <Teams />
                </div>
                :
                <div>DO NOT HAVE PERMISSION</div>
            :
            <div>Loading...</div>
            }
        </div>
    )
}

export default connect(state => ({ maps: state.maps, systems: state.systems, session: state.session }))(SystemPage)
