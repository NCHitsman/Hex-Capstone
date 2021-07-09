import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

import formSideImage from '../../images/formpagemars.png'

const LogInSignUpFormPage = ({ page }) => {
    console.log(page === 'signup')
    const [currentPage, setCurrentPage] = useState(page)
    const [signUpActive, setSignUpActive] = useState(page === 'signup' ? true : false)
    const [logInActive, setLogInActive] = useState(page === 'login' ? true : false)

    console.log(signUpActive)

    return (
        <div className='PageParentLogInSignUpForm'>
            <div className='ParentFormCont'>
                <div className='ParentSwitchButtonCont'>
                    <div
                        onClick={() => {
                            setCurrentPage('signup')
                            setSignUpActive(true)
                            setLogInActive(false)
                        }}
                        className={signUpActive ? 'ParentSwitchButtonContLeft active' : 'ParentSwitchButtonContLeft'}>
                        <div
                            className={signUpActive ? 'ParentSwitchButton active' : 'ParentSwitchButton'}
                        >SIGN UP</div>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentPage('login')
                            setLogInActive(true)
                            setSignUpActive(false)
                        }}
                        className={logInActive ? 'ParentSwitchButtonContRight active' : 'ParentSwitchButtonContRight'}>
                        <div
                            className={logInActive ? 'ParentSwitchButton active' : 'ParentSwitchButton'}
                            onClick={() => {
                                setCurrentPage('login')
                                setLogInActive(true)
                                setSignUpActive(false)
                            }}
                        >Log In</div>
                    </div>
                </div>
                {currentPage === 'login' ?
                    <LoginForm />
                    :
                    <SignupForm />
                }

            </div>
            <img className='BackgroundImage' src={formSideImage} alt='Mars, Cradle of the Mechanicum - Warhammer 40,000© by Joacim Holm; https://www.artstation.com/artwork/WKd69G'></img>
        </div>
    )
}

export default LogInSignUpFormPage
