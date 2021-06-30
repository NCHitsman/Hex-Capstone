import './Home.css'
import LoggedInHome from './LoggedInHome'


export default function Home({user}) {

    return (
        <>
            {user ?
            <LoggedInHome user={user}/>
            :
            <div>Welcome, Sign Up Now!</div>
            }
        </>
    )
}
