export const factionSwitch = (faction) => {
    switch (faction) {
        case '[NCR]':
            return ['Necrons', 'lightgreen']
        case '[SOB]':
            return ['Sisters of Battle', 'pink']
        default:
            return ['not set', 'white']
    }
}


export const FactionOptions = () => {
    const factions = [
        ['Necrons', '[NCR]'],
        ['Sisters of Battle', '[SOB]']
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
