

const SystemUsers = ({ systemUsers }) => {

    return (
        <div className='systemUsers__parent__cont'>
            <div>System Users:</div>
            {Object.values(systemUsers).map((user, i) => (
                <div key={i}>{user.User.username}</div>
            ))}
        </div>
    )
}

export default SystemUsers
