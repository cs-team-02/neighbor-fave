import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import useAuth from "./utils/useAuthHook";
import { CgLogOut } from "react-icons/cg";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const TopMenu = ({ handleClick, isLoggedIn }) => {
  const currentUser = useAuth();
  return (
    <div className="menu-bar">
      <nav className="padding-div">
        {isLoggedIn ? (
          <div id="top-menu-div">
            {/* The navbar will show these links after you log in */}

            <MdOutlineArrowBackIosNew onClick={() => history.back()} />

            <a href="#" onClick={handleClick}>
              <CgLogOut className="icon-medium" />
            </a>
            <div id="profile-thumb-div">
              <img className="thumb-img" src={currentUser.ImageURL} />

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
