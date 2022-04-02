import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, authenticateSignup } from '../store';
import SearchField from './geo';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [address, setAddress] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (evt.target.name === 'login') {
      dispatch(authenticate(username, password));
    } else {
      const name = evt.target.nameofuser.value;
      dispatch(authenticateSignup({ name, username, address, password }));
    }
  };
  const handleDemo =(e) => {
    e.preventDefault();
    const username = 'demo';
    const password = '123';
    dispatch(authenticate(username, password ));
  }

  return (
    <div className='sign-form-wrapper'>
      <form onSubmit={handleSubmit} name={name} className='sign-form'>
        {name === 'login' && (
          <>
            <h1 className='padding-div'>Sign In</h1>
            <div>
              <label htmlFor='username'>
                <b>Username</b>
              </label>
              <input
                name='username'
                type='text'
                placeholder='Username'
                required
              />
            </div>
            <div>
              <label htmlFor='password'>
                <b>Password</b>
              </label>
              <input
                name='password'
                type='password'
                className='sign-form-input'
                placeholder='Password'
                required
              />
            </div>
            <div className='spacer-div'></div>
            <div className='center-text-div'>
              <button type='submit' className='medium-button'>
                <b>{displayName}</b>
              </button>
            </div>
            <div className='spacer-div'></div>
            <div className='center-text-div'>
              <Link to='/signup'>
                <b>Sign Up</b>
              </Link>
            </div>
          </>
        )}

        {name === 'signup' && (
          <>
            <h1 className='padding-div'>Sign Up</h1>
            <div>
              <label htmlFor='nameofuser'>
                <b>Name*</b>
              </label>
              <input
                name='nameofuser'
                type='text'
                placeholder='Your name'
                required
              />
              <SearchField onChange={setAddress} />
            </div>
            <div>
              <label htmlFor='username'>
                <b>Username*</b>
              </label>
              <input
                name='username'
                type='text'
                placeholder='Username'
                required
              />
            </div>
            <div>
              <label htmlFor='password'>
                <b>Password*</b>
              </label>
              <input
                name='password'
                type='password'
                className='sign-form-input'
                placeholder='Password'
                required
              />
            </div>
            <div className='spacer-div'></div>
            <div className='center-text-div'>
              <button type='submit' className='medium-button'>
                <b>{displayName}</b>
              </button>
            </div>
            <div className='spacer-div'></div>
            <div className='center-text-div'>
              <a onClick={() => history.back()}>
                <b>Back</b>
              </a>
              {error && error.response && <div> {error.response.data} </div>}
            </div>
          </>
        )}
      <button onClick={(e)=>handleDemo(e)} className='medium-button'>
            <b>Demo Login</b>
        </button>
      </form>
    </div>
  );
};

export const Login = () => <AuthForm name='login' displayName='Sign In' />;
export const Signup = () => <AuthForm name='signup' displayName='Sign Up' />;
