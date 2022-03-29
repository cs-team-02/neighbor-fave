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
  const bidsOffered = (user) => {
    return user.bids.filter((bid) => bid.status === "PENDING").length;
  };
  const favorsDone = (user) => {
    return user.bids.filter((bid) => bid.status === "FULFILLED").length;
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFavors());
    console.log("top users: ", usersMostBids);
  }, []);

  return (
    <div id="top-contributors-container">
      <h1>Top contributors:</h1>
      <h2>
        <RiStarSmileLine />
        Most Favors <RiStarSmileLine />
      </h2>
      {/* <h4>(1+ favors)</h4> */}
      {usersMostFulfilled.length ? (
        <div>
          {usersMostFulfilled
            .sort((a, b) => b.bids.length - a.bids.length)
            .map((user) => {
              return (
                <Link to={`/users/${user.id}`} key={user.id}>
                  <img
                    className="top-con-img"
                    height="40px"
                    width="40px"
                    src={user.ImageURL}
                  />
                  {user.name} ({favorsDone(user)} favors done)
                  <br />
                </Link>
              );
            })}
        </div>
      ) : (
        <div>No neighbors with more than 1 fulfilled favor right now</div>
      )}
      <hr></hr>

      <h2>
        Offered most bids <WiStars />{" "}
      </h2>
      {/* <h4>(3+ bids)</h4> */}

      {usersMostBids.length ? (
        <div>
          {usersMostBids
            .sort((a, b) => b.bids.length - a.bids.length)
            .map((user) => {
              return (
                <Link to={`/users/${user.id}`} key={user.id}>
                  <img
                    className="top-con-img"
                    height="40px"
                    width="40px"
                    src={user.ImageURL}
                  />
                  {user.name} ({bidsOffered(user)} bids)
                  <br />
                </Link>
              );
            })}
        </div>
      ) : (
        <div>No neighbors with more than 3 pending bids right now</div>
      )}
    </div>
  );
};

export default TopContributors;
