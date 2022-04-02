import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {me} from '../store'
import { Link } from 'react-router-dom';
import { logout } from '../store';
import useAuth from './utils/useAuthHook';
import { FaGlobe } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.auth.id)
  useEffect(() => {
    dispatch(me())
  }, [])
  
  return (
    <div id='navbar-bottom-wrap'>
      <nav>
        {isLoggedIn ? (
          <div id='navbar'>
            {/* The navbar will show these links after you log in */}
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

export default Navbar
