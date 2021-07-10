import { removeUser } from "../../../store/systems"
import { useDispatch } from "react-redux"
import './SystemUsers.css'
import { getTeamPlayers, getTeams } from "../../../store/teams"
import { factionSwitch } from "../../utils"


const SystemUsers = ({ systemUsers, system, showRemove, currentUser, teams }) => {
    const dispatch = useDispatch()


    const removeUserClickHandler = (userId, i) => {
        dispatch(removeUser(userId, system.id, i))
            .then(() => dispatch(getTeams(system.id)))
            .then(() => dispatch(getTeamPlayers(system.id)))  //TODO FIX TEAMS BLINKING IN AND OUT WHEN REMOVING USER
    }

    const permissionTitle = (level) => {
        switch (level) {
            case 1:
                return `Owner`
            case 2:
                return `Captain`
            default:
                return `Player`
        }
    }

    return (
        <>
            <div className='SystemUsersTitle'>System Users:</div>
            <div className='SystemUserCardCont'>
                {Object.values(systemUsers).map((user, i) => {
                    const team = teams[teams.players[user.user_id]?.team_id]
                    return (
                        <div style={{ backgroundColor: team ? factionSwitch(team.faction)[1] : 'lightgray' }} className='card systemUserCard' key={i}>
                            <div>{
                                showRemove ?
                                    user.User.username.length > 8 ?
                                        user.User.username[7] === '' ?
                                            user.User.username.slice(0, 7) + '...' :
                                            user.User.username.slice(0, 8) + '...' :
                                        user.User.username :
                                    user.User.username.length > 16 ?
                                        user.User.username[15] === '' ?
                                            user.User.username.slice(0, 15) + '...' :
                                            user.User.username.slice(0, 16) + '...' :
                                        user.User.username
                            }</div>

                            {
                                showRemove && user.User.id !== system.owner_id &&
                                user.User.id !== currentUser.id &&
                                <button
                                    className='SystemUserRemoveButton'
                                    onClick={() => removeUserClickHandler(user.User.id, i)}
                                >Remove</button>
                            }

                            {user.status === '[ACPT]' ?
                                <div>{permissionTitle(user.level)}</div>
                                :
                                <div>Pending</div>
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SystemUsers
