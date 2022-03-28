import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import useAuth from './utils/useAuthHook';
import { FaGlobe } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';

const Navbar = ({ handleClick, isLoggedIn }) => {
  const currentUser = useAuth();
  return (
    <div id='navbar-bottom-wrap'>
      <nav>
        {isLoggedIn ? (
          <div id='navbar'>
            {/* The navbar will show these links after you log in */}
            {/* <div className='center-text-div'>
              <h5>Hello, {currentUser.name}</h5>
            </div> */}
            <Link to='/home'>
              <FaGlobe className='icon-medium' />
            </Link>
            <Link to='/favors/create'>
              <BsFillPlusCircleFill className='icon-large' />
            </Link>
            <Link to='/users'>
              <HiUsers className='icon-medium' />
            </Link>
          </div>
        ) : (
          <div className='center-text-div'>
            {/* The navbar will show these links before you log in */}
            <h3>NeighborFave</h3>
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

export default connect(mapState, mapDispatch)(Navbar);
