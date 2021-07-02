import './Teams.css'
import TeamCard from './TeamCard'

const Teams = ({teams}) => {


    return (
        <div className='teams__parent__cont'>
            <div className='teams__title'>Teams:</div>
            <div className='teamcard__parent__cont'>
                {Object.values(teams).map((team, i) => (
                    <TeamCard key={i} team={team}/>
                ))}
            </div>
        </div>
    )
}

export default Teams
