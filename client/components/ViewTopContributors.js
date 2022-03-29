import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import users, { fetchUsers } from "../store/usersReducer";
import { fetchFavors } from "../store/favors";
import { Link } from "react-router-dom";
const TopContributors = (props) => {
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const usersMostBids = allUsers.filter(
    (user) => user.bids.filter((bid) => bid.status === "PENDING").length > 1
  );
  const usersMostFulfilled = allUsers.filter(
    (user) => user.bids.filter((bid) => bid.status === "FULFILLED").length > 1
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFavors());
    console.log("top users: ", usersMostBids);
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Top contributors:</h1>
      <br></br>
      <br></br>

      <h2>Offered most bids (3+ bids)</h2>
      {usersMostBids.length ? (
        <div>
          {usersMostBids.map((user) => {
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
        <div>No neighbors with more than 3 pending bids right now</div>
      )}
      <h2>Fulfillled most favors (1+ favors)</h2>
      {usersMostFulfilled.length ? (
        <div>
          {usersMostFulfilled.map((user) => {
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
        <div>No neighbors with more than 1 fulfilled favor right now</div>
      )}
    </div>
  );
};

export default TopContributors;
