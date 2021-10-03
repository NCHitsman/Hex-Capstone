import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

import formSideImage from '../../images/formpagemars.png'

const LogInSignUpFormPage = ({ page }) => {
    const [currentPage, setCurrentPage] = useState(page)
    const [signUpActive, setSignUpActive] = useState(false)
    const [logInActive, setLogInActive] = useState(false)

    useEffect(() => {
        if (page === 'signup') {
            setSignUpActive(true)
            setCurrentPage('signup')
            setLogInActive(false)
        } else {
            setLogInActive(true)
            setCurrentPage('login')
            setSignUpActive(false)
        }
    }, [page])

    return (
        <div className='PageParentLogInSignUpForm'>
            <img
                className='BackgroundImage'
                src={formSideImage}
                alt='Mars, Cradle of the Mechanicum - Warhammer 40,000© by Joacim Holm; https://www.artstation.com/artwork/WKd69G' />
            <div className='ParentFormCont'>
                <div className='ParentSwitchButtonCont'>
                    <div
                        onClick={() => {
                            setCurrentPage('login')
                            setLogInActive(true)
                            setSignUpActive(false)
                        }}
                        className={logInActive ? 'ParentSwitchButtonContLeft active' : 'ParentSwitchButtonContLeft'}>
                        <div
                            className={logInActive ? 'ParentSwitchButton active' : 'ParentSwitchButton'}
                            onClick={() => {
                                setCurrentPage('login')
                                setLogInActive(true)
                                setSignUpActive(false)
                            }}
                        >Log In</div>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentPage('signup')
                            setSignUpActive(true)
                            setLogInActive(false)
                        }}
                        className={signUpActive ? 'ParentSwitchButtonContRight active' : 'ParentSwitchButtonContRight'}>
                        <div
                            className={signUpActive ? 'ParentSwitchButton active' : 'ParentSwitchButton'}
                        >SIGN UP</div>
                    </div>
                </div>
                {currentPage === 'login' ?
                    <LoginForm />
                    :
                    <SignupForm />
                }

            </div>
        </div>
    )
}

export default LogInSignUpFormPage
