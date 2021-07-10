import './Teams.css'
import TeamCard from './TeamCard'

const Teams = ({ teams, user, systemUsers, system, players, edit }) => {



    return (
        <div className='TeamParentCont'>
            <div className='TeamTitle'>Teams:</div>
            <div className='TeamCardCont'>
                {Object.entries(teams).map(([key, team], i) => {
                    if (key !== 'players') {
                        return (
                            <TeamCard key={i} team={team} user={user} systemUsers={systemUsers} system={system} players={players} edit={edit} />
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Teams
