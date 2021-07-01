import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { connect, useDispatch, useSelector } from 'react-redux'
import { getSystem, getSystemUsers, inviteUser } from "../../store/systems"
import { getSystemMaps } from "../../store/maps"
import MapCard from "./MapCard"
import { useHistory } from 'react-router-dom'
import SystemUsers from "./SystemUsers/SystemUsers"
import { getPermission } from "../../store/session"

const SystemPage = ({ user, maps }) => {
    const { systemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [invitee, setInvitee] = useState('')
    const [level, setLevel] = useState('4')

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
    }

    return (
        <div>
            {systemMaps && currentSystem && systemUsers ?
                <div className='systemCard__cont'>
                    <div className='systemCard__cont__title'>
                        Worlds in {currentSystem?.name}:
                    </div>
                    {Object.values(systemMaps).map((map, i) => (
                        <MapCard key={i} map={map} permissionLevel={permissionLevel} />
                    ))}
                    {permissionLevel <= 2 && <button
                        onClick={() => history.push('/createMap')}
                    >Create New Map</button>}
                    <SystemUsers systemUsers={systemUsers} />
                    <div>.</div>
                    <div>.</div>
                    <div>.</div>

                    {permissionLevel <= 2 &&
                    <>
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
                            <option value='4'>4 - Viewer</option>
                            <option value='3'>3 - Editor</option>
                            <option value='2'>2 - Co-Owner</option>
                        </select>
                        <button
                        onClick={() => inviteUserHandler()}
                        >Invite</button>
                    </>}
                </div>
                :
                <div>Loading...</div>
            }
        </div>
    )
}

export default connect(state => ({ maps: state.maps }))(SystemPage)
