import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersReducer";
import { fetchFavors } from "../store/favors";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { RiStarSmileLine } from "react-icons/ri";
const TopContributors = () => {
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
      <h3>Top Contributors:</h3>
      <br></br>
      <h4 className="grey-box">
        <RiStarSmileLine />
        Fulfilled Most Favors
        <RiStarSmileLine />
      </h4>
      <hr></hr>
      {usersMostFulfilled.length ? (
        <div>
          {usersMostFulfilled
            .sort((a, b) => b.bids.length - a.bids.length)
            .map((user) => {
              return (
                <Link to={`/users/${user.id}`} key={user.id}>
                  <div className="contributor">
                    <img
                      className="top-con-img"
                      height="30px"
                      width="30px"
                      src={user.ImageURL}
                    />
                    {user.name} ({favorsDone(user)} favors done)
                    <br />
                  </div>
                </Link>
              );
            })}
        </div>
      ) : (
        <div>No neighbors with more than 1 fulfilled favor right now</div>
      )}

      <h4 className="grey-box">
        <WiStars /> Offered most bids <WiStars />{" "}
      </h4>
      <hr></hr>

      {usersMostBids.length ? (
        <div>
          {usersMostBids
            .sort((a, b) => b.bids.length - a.bids.length)
            .map((user) => {
              return (
                <Link to={`/users/${user.id}`} key={user.id}>
                  <div className="contributor">
                    {" "}
                    <img
                      className="top-con-img"
                      height="30px"
                      width="30px"
                      src={user.ImageURL}
                    />
                    {user.name} ({bidsOffered(user)} bids)
                    <br />
                  </div>
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
