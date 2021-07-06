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
        <div className='systemUsers__parent__cont'>
            <div className='systemUsers__cont__title'>System Users:</div>
            {Object.values(systemUsers).map((user, i) => {
                const team = teams[teams.players[user.user_id]?.team_id]
                return (
                <div style={{backgroundColor: team ? factionSwitch(team.faction)[1] : 'lightgray'}} className='card' key={i}>
                    <div>{user.User.username}</div>

                    {
                        showRemove && user.User.id !== system.owner_id &&
                        user.User.id !== currentUser.id &&
                        <button
                            onClick={() => removeUserClickHandler(user.User.id, i)}
                        >Remove</button>
                    }

                    {user.status === '[ACPT]' ?
                        <div>{permissionTitle(user.level)}</div>
                        :
                        <div>PENDING</div>
                    }
                </div>
            )})}
        </div>
    )
}

export default SystemUsers
