export const factionSwitch = (faction) => {
    switch (faction) {
        case '[IMP]':
            return ['Imperium', '#9297A0']
        case '[CHA]':
            return ['Chaos', '#D00000']
        case '[NCR]':
            return ['Necrons', '#495A52']
        case '[ALD]':
            return ['Aeldari', '#85FFFB']
        case '[NID]':
            return ['Tyranids', '#AC72AB']
        case '[ORK]':
            return ['Orks', '#91BC24']
        case '[TAU]':
            return ['Tau', '#EE6644']
        default:
            return ['not set', 'white']
    }
}


export const FactionOptions = () => {
    const factions = [
        ['Imperium', '[IMP]'],
        ['Chaos', '[CHA]'],
        ['Necrons', '[NCR]'],
        ['Aeldari', '[ALD]'],
        ['Tyranids', '[NID]'],
        ['Orks', '[ORK]'],
        ['Tau', '[TAU]'],
    ]

    return (
        <>
            {factions.map(([faction, id], i) => {
                return (
                    <option key={i} value={id}>{faction}</option>
                )
            })}
        </>
    )
}
