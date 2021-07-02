import factionSwitch from "./factionSwitch"


const TeamCard = ({team}) => {

    const faction = factionSwitch(team.faction)

    console.log('PLAYERS =>>>>>', team.players)

    return (
        <div className='teamcard__cont'>
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
