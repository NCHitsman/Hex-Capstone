import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css'

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
    <form className='LogInForm' onSubmit={handleSubmit}>
      <div className='LogInFormErrors'>
        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
      </div>
      <label className='LogInFormLabel'>
        Username or Email:
        <input
          className='LogInFormInput'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='LogInFormLabel'>
        Password:
        <input
          className='LogInFormInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='LogInFormButton' type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
