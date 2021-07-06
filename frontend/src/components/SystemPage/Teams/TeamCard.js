import { useState } from "react"
import { deleteTeam, removeFromTeam, addUserToTeam } from "../../../store/teams"
import factionSwitch from "./factionSwitch"
import { useDispatch } from 'react-redux'


const TeamCard = ({team, user, systemUsers, systemId}) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [addUser, setAddUser] = useState('')
    const owner = user.id === team.owner_id

    const [faction, color] = factionSwitch(team.faction)

    const deleteClickHandler = () => {
        dispatch(deleteTeam(team.id))
    }

    const removeUserClickHandler = (userId) => {
        dispatch(removeFromTeam(userId, team.id))
    }

    const addUserClickHandler = () => {
        if (addUser) {
            dispatch(addUserToTeam(addUser, team.id, systemId))
            setAddUser('')
        }
    }

    return (
        <div className='teamcard__cont' style={{backgroundColor: color}}>
            {owner &&
            <button
            onClick={() => edit ? setEdit(false) : setEdit(true)}
            >Edit</button>
            }
            <div>{team.name}</div>
            <div>{faction}</div>
            <div>{team.points}</div>

            <div>.</div>
            <div>.</div>
            <div>.</div>

            {team.players && Object.values(team.players).map((player,i) => (
                <div key={i} style={{display: 'flex'}}>
                    <div>{player.User.username}</div>
                    {edit && player.user_id !== user.id && <button
                    onClick={() => removeUserClickHandler(player.user_id)}
                    >Remove</button>}
                </div>
            ))}
            {edit &&
            <>
                <div>.</div>
                <div>.</div>
                <div>.</div>

                <select
                value={addUser}
                onChange={(e) => setAddUser(e.target.value)}
                >
                    <option value={''} defaultValue disabled hidden>
                        Select a User
                    </option>
                    {Object.values(systemUsers).map((user, i) => {
                        if (!team.players[user.user_id]) {
                            return (
                                <option key={i} value={user.user_id}>{user.User.username}</option>
                            )
                        }
                        return null
                    })}
                </select>

                <button
                onClick={() => addUserClickHandler()}
                >
                    Add User
                </button>

                <div>.</div>
                <div>.</div>
                <div>.</div>

                <button
                onClick={() => deleteClickHandler()}
                >Delete</button>
            </>
            }
        </div>
    )
}

export default TeamCard
