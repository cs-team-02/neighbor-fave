import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import users, { fetchUsers } from "../store/usersReducer";
import { fetchFavors } from "../store/favors";
import { Link } from "react-router-dom";
const TopContributors = () => {
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const usersFiltered = allUsers.filter(
    (user) => user.bids.filter((bid) => bid.status === "PENDING").length > 0
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFavors());
    console.log("top users: ", usersFiltered);
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Top contributors:</h1>

      {usersFiltered.length ? (
        <div>
          {usersFiltered.map((user) => {
            return (
              <Link to={`/users/${user.id}`} key={user.id}>
                <img height="40px" width="40px" src={user.ImageURL} />
                {user.name} ( {user.bids.length} bids )
                <br />
              </Link>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default TopContributors;
