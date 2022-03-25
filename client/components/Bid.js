import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptBid } from "../store/favors";
import { fetchSingleFavor } from "../store/SingleFavor";
import { Link } from "react-router-dom";
import useAuth from "./utils/useAuthHook";
// import css from "./Bidstyle.css";

const Bid = (props) => {
  const { bid, favor } = props;

  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);
  const CurrentUser = useAuth();
  const isAuthor = CurrentUser.id === favor.author.id;
  const isVolunteer = CurrentUser.id === bid.volunteer.id;
  const canViewChat = isAuthor || isVolunteer;

  // CurrentUser.id === bid.volunteer.id || favor.author.id
  // CurrentUser === bid.volunteer || favor.author

  const handleAcceptBid = async () => {
    await dispatch(acceptBid(bid.id, bid.favorId));
    await dispatch(fetchSingleFavor(bid.favorId));
  };

  const toggleShowChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="bid-container">
      <span id="bidder-name">
        from
        <Link to={`/users/${bid.volunteer.id}`}>{bid.volunteer.name}</Link>:
      </span>
      <div>{bid.description}</div>

      <div>
        <span id="bid-status">{bid.status}</span>
        <br></br>
        {isAuthor ? (
          <button onClick={handleAcceptBid}>Accept offer</button>
        ) : null}
        <br />
      </div>
      {canViewChat ? (
        <div id="chat-div">
          <button onClick={toggleShowChat}>
            {!showChat ? `Show Chat` : "Hide Chat"}
          </button>
          {showChat ? (
            <div id="chat-box">
              Chat box here: current user is {CurrentUser.id} and favor author
              is {favor.author.id} and bid volunteer is {bid.volunteer.id}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>Not your chat</div>
      )}

      <br />
    </div>
  );
};

export default Bid;
