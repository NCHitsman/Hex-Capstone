import './Teams.css'
import TeamCard from './TeamCard'

const Teams = ({teams, user, systemUsers, systemId}) => {



    return (
        <div className='teams__parent__cont'>
            <div className='teams__title'>Teams:</div>
            <div className='teamcard__parent__cont'>
                {Object.entries(teams).map(([key, team], i) => {
                    if (key !== 'players') {
                        return(
                        <TeamCard key={i} team={team} user={user} systemUsers={systemUsers} systemId={systemId}/>
                        )
                    }
                    return null
                    })}
            </div>
        </div>
    )
}

export default Teams
