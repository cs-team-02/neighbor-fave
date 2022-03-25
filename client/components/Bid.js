import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptBid } from "../store/favors";
import { fetchSingleFavor } from "../store/SingleFavor";
import { Link } from "react-router-dom";
// import css from "./Bidstyle.css";

const Bid = (props) => {
  const { bid } = props;
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);

  const handleAcceptBid = async () => {
    await dispatch(acceptBid(bid.id, bid.favorId));
    await dispatch(fetchSingleFavor(bid.favorId));
  };

  const toggleShowChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="bid-container">
        <span id="bidder-name">from 
          <Link to={`/users/${bid.volunteer.id}`}>
            {bid.volunteer.name}
          </Link>
          :
        </span>
      <div>{bid.description}</div>

      <div>
        <span id="bid-status">{bid.status}</span>
        <br></br>
        <button onClick={handleAcceptBid}>Accept offer</button>
        <br />
      </div>
      <div id="chat-div">
        <button onClick={toggleShowChat}>
          {!showChat ? `Show Chat with ${bid.volunteer.name}` : "Hide Chat"}
        </button>
        {showChat ? <div id="chat-box">Chat box here</div> : <div></div>}
      </div>
      <br />
    </div>
  );
};

export default Bid;