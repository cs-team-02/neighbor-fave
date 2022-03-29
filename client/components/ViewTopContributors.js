import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersReducer";
import { fetchFavors } from "../store/favors";
import { Link } from "react-router-dom";
// import { FiStar } from "react-icons/fi";
import { WiStars } from "react-icons/wi";
import { RiStarSmileLine } from "react-icons/ri";
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
    <div id="top-contributors-container">
      <h1>Top contributors:</h1>
      <h2>Offered most bids </h2>
      <h4>(3+ bids)</h4>

      {usersMostBids.length ? (
        <div>
          {usersMostBids.map((user) => {
            return (
              <Link to={`/users/${user.id}`} key={user.id}>
                <img height="40px" width="40px" src={user.ImageURL} />
                {user.name} ( {user.bids.length} bids ) <WiStars />
                <br />
              </Link>
            );
          })}
        </div>
      ) : (
        <div>No neighbors with more than 3 pending bids right now</div>
      )}
      <hr></hr>
      <h2>Fulfillled most favors </h2>
      <h4>(1+ favors)</h4>
      {usersMostFulfilled.length ? (
        <div>
          {usersMostFulfilled.map((user) => {
            return (
              <Link to={`/users/${user.id}`} key={user.id}>
                <img height="40px" width="40px" src={user.ImageURL} />
                {user.name} ( {user.bids.length} bids ) <RiStarSmileLine />
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
