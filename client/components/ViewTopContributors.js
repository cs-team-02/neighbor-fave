import React, { useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/usersReducer";

const TopContributors = () => {


  const allUsers = useSelector(state => state.users)
  const usersFiltered = allUsers.filter(user => user.bids.filter(bid => bid.status === "FULFILLED").length > 50)
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFavors());
  }, []);

  return (
    // MAP OVER usersFiltered array
  )
};
