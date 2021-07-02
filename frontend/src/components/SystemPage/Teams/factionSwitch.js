const factionSwitch = (faction) => {
    switch (faction) {
        case '[NCR]':
            return ['Necrons', 'lightgreen']
        case '[SOB]':
            return ['Sisters of Battle', 'pink']
        default:
            return ['not set', 'white']
    }
}


export default factionSwitch
