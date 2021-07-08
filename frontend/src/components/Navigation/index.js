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
        <div className='WelcomeTextCont'>
          <div className='WelcomeText' >Welcome Commander {sessionUser.username}
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300&family=Staatliches&display=swap');
            </style>
          </div>
        </div>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className='LogOutSignUpButtonCont'>
          <NavLink className='LogOutSignUpButton' to="/signup">SIGN UP
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
            </style>
          </NavLink>
        </div>
      </>
    );
  }

  return (
    <div className='nav__cont'>
      <div className='HomeLinkCont'>
        <NavLink className='HomeLink' exact to="/">Planetary Empires
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
          </style>
        </NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
