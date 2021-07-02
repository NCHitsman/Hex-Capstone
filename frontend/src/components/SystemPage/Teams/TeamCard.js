import factionSwitch from "./factionSwitch"


const TeamCard = ({team}) => {

    const [faction, color] = factionSwitch(team.faction)

    return (
        <div className='teamcard__cont' style={{backgroundColor: color}}>
            <div>{team.name}</div>
            <div>{faction}</div>
            <div>{team.points}</div>
            {team.players?.map((player,i) => (
                <div key={i}>{player.User.username}</div>
            ))}
        </div>
    )
}

export default TeamCard
