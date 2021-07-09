import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import '../LogInSignUpForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
      <form className='FormCont' onSubmit={handleSubmit}>
        <div style={{ display: errors.length ? 'block' : 'none' }} className='FormErrors'>
          {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>
        <label className='FormLabel'>
          Email:
          <input
            className='FormInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='FormLabel'>
          Username:
          <input
            className='FormInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <label className='FormLabel'>
          Confirm Password:
          <input
            className='FormInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className='FormButton' type="submit">Sign Up</button>
      </form>
  );
}

export default SignupForm;
