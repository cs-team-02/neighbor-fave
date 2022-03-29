import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authenticate, authenticateSignup} from '../store'
import SearchField from './geo'
import useForm from './utils/useForm';

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [address, setAddress] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const name = evt.target.nameofuser.value
    const username = evt.target.username.value
    const password = evt.target.password.value
    if(evt.target.name === 'login'){
      dispatch(authenticate(username, password))
      console.log('still in login')
    }else{
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
        {name === 'signup' && <SearchField onChange={setAddress}/>}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = () =><AuthForm name="login" displayName="Login" />
export const Signup = () =><AuthForm name="signup" displayName="Sign Up" />