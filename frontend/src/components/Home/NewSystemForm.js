import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewSystem } from "../../store/systems"
import { useHistory } from 'react-router-dom'


const NewSystemForm = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [systemName, setSystemName] = useState('')

    const newSystemFormSubmitHandler = () => {
        dispatch(createNewSystem(systemName, user.id))
            .then((res) => history.push(`/system/${res}`))
    }

    return (
        <>
            <div> Create New System: </div>
            <label>
                System Name:
                <input
                    type='text'
                    value={systemName}
                    required={true}
                    onChange={(e) => setSystemName(e.target.value)}
                />
            </label>
            <button
                onClick={() => systemName.length > 0 && newSystemFormSubmitHandler()}
            >Submit</button>
        </>
    )
}

export default NewSystemForm
