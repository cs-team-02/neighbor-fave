import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import useAuth from './utils/useAuthHook';

const TopMenu = ({ handleClick, isLoggedIn }) => {
  const currentUser = useAuth();
  return (
    <div className='menu-bar'>
      <nav>
        {isLoggedIn ? (
          <div id='top-menu-div'>
            {/* The navbar will show these links after you log in */}

            <img className='thumb-img' src={currentUser.ImageURL} />
            <b>{currentUser.name}</b>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className='right-text-div'>
            {/* The navbar will show these links before you log in */}
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(TopMenu);