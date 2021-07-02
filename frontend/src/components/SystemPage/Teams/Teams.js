import './Teams.css'

const Teams = ({teams}) => {


    return (
        <div className='teams__parent__cont'>
            <div className='teams__title'>Teams:</div>

            {Object.values(teams).map((team, i) => (
                <div key={i}>{team.name}</div>
            ))}

        </div>
    )
}

export default Teams
