import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { clearMaps } from "../../store/maps";
import * as sessionActions from '../../store/session';
import { clearAllSystems } from "../../store/systems";
import './Navigation.css';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(clearAllSystems())
    dispatch(clearMaps())
    dispatch(sessionActions.logout()).then(() => history.push('/'))

  };

  return (
    <div className='LogOutSignUpButtonCont'>
      <button className='LogOutSignUpButton' onClick={logout}>LOG OUT
      </button>
    </div>
  );
}

export default ProfileButton;
