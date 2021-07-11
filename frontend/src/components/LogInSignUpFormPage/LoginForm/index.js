import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import '../LogInSignUpForm.css'

function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(res => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className='FormCont' onSubmit={handleSubmit}>
      <div style={{ display: errors.length ? 'block' : 'none' }} className='FormErrors'>
        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
      </div>
      <label className='FormLabel'>
        Username or Email:
        <input
          className='FormInput'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='FormLabel'>
        Password:
        <input
          className='FormInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='FormButton' type="submit">Log In</button>
      <button
        onClick={() => {
          dispatch(sessionActions.login({ credential: 'demo1@user.io', password: 'password' }))
            .then(res => history.push('/'))
        }
        }
        className='FormButton'
        type='button'
        >Demo User</button>
    </form>
  );
}

export default LoginForm;
