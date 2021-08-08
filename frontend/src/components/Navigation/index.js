import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* <div className='WelcomeTextCont'> */}
        {/* <div className='WelcomeText' >Welcome Commander {sessionUser.username} */}
        {/* </div> */}
        {/* </div> */}
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className='LogOutSignUpButtonCont'>
          <NavLink className='LogOutSignUpButton' to="/login">LOG IN</NavLink>
          <NavLink className='LogOutSignUpButton' to="/signup">SIGN UP</NavLink>
        </div>
      </>
    );
  }

  return (
    <div className='NavCont'>
      <div className='HomeLinkCont'>
        <NavLink className='HomeLink' exact to="/">Planetary Empires</NavLink>
      </div>
      <div className='NavLinkParentCont'>
        <div className='NavLinkCont Features'>
          <NavLink
            className='NavLink' to='/features'>Features</NavLink>
        </div>
        <div className='NavLinkCont'>
          <NavLink className='NavLink' to='/howToPlay'>How To Play</NavLink>
        </div>
        <div className='NavLinkCont'>
          <NavLink
            onClick={(e) => e.preventDefault()}
            className='NavLink UnderConstruction' to='/mapGallery'>Map Gallery</NavLink>
        </div>
        <div className='NavLinkCont'>
          <NavLink
            onClick={(e) => e.preventDefault()}
            className='NavLink UnderConstruction' to='/faq'>FAQ</NavLink>
        </div>
        <div className='NavLinkCont'>
          <NavLink className='NavLink' to='/about'>About Me</NavLink>
        </div>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
