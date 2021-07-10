import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTeam } from "../../../store/teams"
import { FactionOptions } from "../../utils"


const CreateTeamForm = ({ user, system }) => {
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState('')
    const [faction, setFaction] = useState('')

    const createTeamFormSubmitHandler = () => {
        dispatch(createTeam(teamName, faction, system.id, user.id))
        setTeamName('')
        setFaction('')
    }

    return (
        <div className='InviteUserCreateTeamFormCont'>
            <div></div>
            <div className='InviteUserCreateTeamFormTitle'>Create Team:</div>
            <input
                placeholder='Team Name'
                className='InviteUserCreateTeamFormInput'
                type='text'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            ></input>
            <select
                className='InviteUserCreateTeamFormSelect'
                value={faction}
                onChange={(e) => setFaction(e.target.value)}
            >
                <option value={''} defaultValue disabled hidden>
                    Select A Faction
                </option>
                <FactionOptions />
            </select>
            <button
                className='InviteUserCreateTeamFormButton'
                onClick={() => createTeamFormSubmitHandler()}
            >Submit</button>
            <div></div>
        </div>
    )
}



export default CreateTeamForm
