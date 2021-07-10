import { useEffect, useState } from "react"
import { deleteTeam, removeFromTeam, addUserToTeam } from "../../../store/teams"
import { factionSwitch } from "../../utils"
import { useDispatch } from 'react-redux'


const TeamCard = ({ team, user, systemUsers, system, players, edit }) => {
    const dispatch = useDispatch()
    const [addUser, setAddUser] = useState('')
    const [addUserRole, setAddUserRole] = useState(false)

    const [faction, color] = factionSwitch(team.faction)

    const deleteClickHandler = () => {
        dispatch(deleteTeam(team.id))
    }

    const removeUserClickHandler = (userId) => {
        dispatch(removeFromTeam(userId, team.id))
    }

    const addUserClickHandler = () => {
        if (addUser) {
            dispatch(addUserToTeam(addUser, addUserRole, team.id, system.id))
            setAddUser('')
        }
    }


    return (
        <div className='TeamCard' style={{ backgroundColor: color }}>
            <div className='TeamCardName'>{
                team.name.length > 10 ?
                    team.name[9] === ' ' ?
                        team.name.slice(0, 11) + '...' :
                        team.name.slice(0, 10) + '...' :
                    team.name
            }
            </div>
            <div className='TeamCardFaction'>{faction}</div>


            {team.players && Object.values(team.players).map((player, i) => (
                <div className='TeamCardPlayerName' key={i} style={{ display: 'flex' }}>
                    <div>{
                        edit ?
                            player.User.username.length > 8 ?
                                player.User.username[7] === '' ?
                                    player.User.username.slice(0, 7) + '...' :
                                    player.User.username.slice(0, 8) + '...' :
                                player.User.username :
                            player.User.username.length > 11 ?
                                player.User.username[10] === '' ?
                                    player.User.username.slice(0, 10) + '...' :
                                    player.User.username.slice(0, 11) + '...' :
                                player.User.username


                    } - {player.captain ? 'Captain' : 'Player'}</div>
                    {edit && player.user_id !== user.id && <div
                        className='TeamCardRemoveUserButton'
                        onClick={() => removeUserClickHandler(player.user_id)}
                    >X</div>}
                </div>
            ))}
            {edit &&
                <>
                    <div>
                        <label>
                            User:
                        </label>
                        <select
                            value={addUser}
                            onChange={(e) => setAddUser(e.target.value)}
                        >
                            <option value={''} defaultValue disabled hidden>
                                Select a User
                            </option>
                            {Object.values(systemUsers).map((user, i) => {
                                if (!players[user.user_id] && user.status === '[ACPT]') {
                                    return (
                                        <option key={i} value={user.user_id}>{user.User.username}</option> //TODO ADD CAPTAIN OPTION
                                    )
                                }
                                return null
                            })}
                        </select>
                    </div>


                    <div>
                        <select value={addUserRole} onChange={(e) => setAddUserRole(e.target.value)}>
                            <option value={false}>Player</option>
                            <option value={true}>Captain</option>
                        </select>
                    </div>



                    <div>
                        <button
                            onClick={() => addUserClickHandler()}
                        >
                            Add User
                        </button>
                    </div>

                    <button
                        onClick={() => deleteClickHandler()}
                    >Delete</button>
                </>
            }
        </div>
    )
}

export default TeamCard
