import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { connect, useDispatch, useSelector } from 'react-redux'
import { getSystem, getSystemUsers } from "../../store/systems"
import { getSystemMaps } from "../../store/maps"
import MapCard from "./MapCard"
import { useHistory } from 'react-router-dom'
import SystemUsers from "./SystemUsers/SystemUsers"
import { getPermission } from "../../store/session"

const SystemPage = ({ user, maps }) => {
    const { systemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSystem(systemId))
        dispatch(getSystemMaps(systemId))
        dispatch(getSystemUsers(systemId))
        dispatch(getPermission(user.id))
    }, [dispatch, systemId, user.id])

    const currentSystem = useSelector(state => state.systems.system)
    const systemMaps = useSelector(state => state.maps.systemMaps)
    const systemUsers = useSelector(state => state.systems.systemUsers)
    const permissionLevel = useSelector(state => state.session.permission?.level)

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
                    {permissionLevel <= 1 && <button
                        onClick={() => history.push('/createMap')}
                    >Create New Map</button>}
                    <SystemUsers systemUsers={systemUsers} />
                </div>
                :
                <div>Loading...</div>
            }
        </div>
    )
}

export default connect(state => ({ maps: state.maps }))(SystemPage)
