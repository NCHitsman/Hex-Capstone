

const FactionOptions = () => {
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


export default FactionOptions
