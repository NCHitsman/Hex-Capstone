import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTeam } from "../../../store/teams"
import FactionOptions from "./FactionOptions"


const CreateTeamForm = ({user, system}) => {
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState('')
    const [faction, setFaction] = useState('')

    const createTeamFormSubmitHandler = () => {
        dispatch(createTeam(teamName, faction, system.id, user.id))
        setTeamName('')
        setFaction('')
    }

    return (
        <>
            <div>Create Team:</div>
            <label>
                Name:
                <input
                type='text'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                ></input>
            </label>
            <select
            value={faction}
            onChange={(e) => setFaction(e.target.value)}
            >
                <option value={''} defaultValue disabled hidden>
                Select A Faction
                </option>
                <FactionOptions />
            </select>
            <button
            onClick={() => createTeamFormSubmitHandler()}
            >Submit</button>
        </>
    )
}



export default CreateTeamForm
