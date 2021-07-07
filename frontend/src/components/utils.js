export const factionSwitch = (faction) => {
    switch (faction) {
        case '[IMP]':
            return ['Imperium', 'gray']
        case '[CHA]':
            return ['Chaos', 'darkred']
        case '[NCR]':
            return ['Necrons', 'lightgreen']
        case '[ALD]':
            return ['Aeldari', 'lightblue']
        case '[NID]':
            return ['Tyranids', 'purple']
        case '[ORK]':
            return ['Orks', 'green']
        case '[TAU]':
            return ['Tau', 'orange']
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
