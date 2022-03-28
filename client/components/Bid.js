import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBid } from '../store/favors';
import { fetchSingleFavor } from '../store/SingleFavor';
import { Link } from 'react-router-dom';
import useAuth from './utils/useAuthHook';
// import css from "./Bidstyle.css";

const Bid = (props) => {
  const { bid, favor } = props;

  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);
  const CurrentUser = useAuth();
  const isAuthor = CurrentUser.id === favor.author.id;
  const isVolunteer = CurrentUser.id === bid.volunteer.id;
  const canViewChat = isAuthor || isVolunteer;

  const handleAcceptBid = async () => {
    // await dispatch(acceptBid(bid.id, bid.favorId));
    // INSTEAD
    if (bid.status === 'PENDING') {
      await dispatch(updateBid(bid, { status: 'ACCEPTED' }));
    } else if (bid.status === 'ACCEPTED') {
      await dispatch(updateBid(bid, { status: 'PENDING' }));
    }
    await dispatch(fetchSingleFavor(bid.favorId));
  };

  // const toggleShowChat = () => {
  //   setShowChat(!showChat);
  // };

  return (
    <div className="single-bid-container">
      <span id="bidder-name">
        <Link to={`/users/${bid.volunteer.id}`}> {bid.volunteer.name}</Link>:
      </span>
      <p>{bid.description}</p>
      <div>
        {isAuthor ? (
          <button onClick={handleAcceptBid}>
            {bid.status === 'ACCEPTED' ? 'Revoke' : 'Accept offer'}
          </button>
        ) : null}
        <span id="bid-status">{bid.status}</span>
      </div>
      {canViewChat ? (
        <div id="chat-div">
          {/* <button onClick={toggleShowChat}>
            {!showChat ? `Show Chat` : 'Hide Chat'}
          </button> */}
          <Link to="/ChatForm">Show Chat</Link>
          {showChat ? <div id="chat-box">Chat box here:</div> : <div></div>}
        </div>
      ) : (
        <div>Not your chat</div>
      )}
    </div>
  );
};

export default Bid;
