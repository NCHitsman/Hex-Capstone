const factionSwitch = (faction) => {
    switch (faction) {
        case '[NCR]':
            return 'Necrons'
        case '[SOB]':
            return 'Sisters of Battle'
        default:
            return 'not set'
    }
}


export default factionSwitch
