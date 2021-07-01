import { removeUser } from "../../../store/systems"
import { useDispatch } from "react-redux"
import './SystemUsers.css'


const SystemUsers = ({ systemUsers, system, showRemove, currentUser }) => {
    const dispatch = useDispatch()

    const removeUserClickHandler = (userId, i) => {
        dispatch(removeUser(userId, system.id, i))
    }

    const permissionTitle = (level) => {
        switch (level){
            case 1:
                return 'Owner'
            case 2:
                return 'Co-Owner'
            case 3:
                return 'Editor'
            case 4:
                return 'Viewer'
        }
    }

    return (
        <div className='systemUsers__parent__cont'>
            <div className='systemUsers__cont__title'>System Users:</div>
            {Object.values(systemUsers).map((user, i) => (
                <div className='card' key={i}>
                    <div>{user.User.username}</div>

                    {
                    showRemove && user.User.id !== system.owner_id &&
                    user.User.id !== currentUser.id &&
                    <button
                    onClick={() => removeUserClickHandler(user.User.id, i)}
                    >Remove</button>
                    }

                    <div>{permissionTitle(user.level)}</div>
                </div>
            ))}
        </div>
    )
}

export default SystemUsers
