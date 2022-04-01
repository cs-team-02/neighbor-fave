import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authenticate, authenticateSignup} from '../store'
import SearchField from './geo'

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [address, setAddress] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if(evt.target.name === 'login'){
      dispatch(authenticate(username, password))
    }else{
      const name = evt.target.nameofuser.value;
      dispatch(authenticateSignup({name, username,address, password}))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && 
      <div>
          <label htmlFor="nameofuser">
            <small>Name</small>
          </label>
          <input name="nameofuser" type="text" />
        </div>}
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {name === 'signup' && <SearchField onChange={setAddress} />}
        <div>
          <button type="submit" onClick={validate(address)}>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}
function validate(address){
  if(address.length < 10){
    <span>please select an</span>
  }
}

export const Login = () =><AuthForm name="login" displayName="Login" />
export const Signup = () =><AuthForm name="signup" displayName="Sign Up" />