import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from "../store";
import {me} from '../store'
import useAuth from "./utils/useAuthHook";
import { CgLogOut } from "react-icons/cg";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const TopMenu = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const currentUser = useAuth();
  
  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    <div className="menu-bar">
      <nav className="padding-div">
        {isLoggedIn ? (
          <div id="top-menu-div">
            {/* The navbar will show these links after you log in */}


            <MdOutlineArrowBackIosNew onClick={() => history.back()} />

            
            <div id='profile-thumb-div'>
              <img className='thumb-img' src={currentUser.ImageURL} />


              <Link to={`/profile`}>
                <b>{currentUser.name}</b>
              </Link>
            </div>
          </div>
        ) : (
          <div className="right-text-div">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};


export default TopMenu
