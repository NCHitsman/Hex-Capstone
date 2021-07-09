import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewSystem } from "../../store/systems"
import { useHistory } from 'react-router-dom'
import './Home.css'

const NewSystemForm = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [systemName, setSystemName] = useState('')

    const newSystemFormSubmitHandler = () => {
        dispatch(createNewSystem(systemName, user.id))
            .then((res) => history.push(`/system/${res}`))
    }

    return (
        <div className='NewSystemFormParentCont'>
            <div className='NewSystemFormTitle'>Create New System:</div>
            <input
                className='NewSystemFormInput'
                placeholder='System Name'
                type='text'
                value={systemName}
                required={true}
                onChange={(e) => setSystemName(e.target.value)}
            />
            <button
                className='NewSystemFormButton'
                onClick={() => systemName.length > 0 && newSystemFormSubmitHandler()}
            >Submit</button>
        </div>
    )
}

export default NewSystemForm
