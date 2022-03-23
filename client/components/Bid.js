import React from 'react';
import { useDispatch } from 'react-redux';
import { acceptBid } from '../store/favorsReducer';
import { fetchSingleFavor } from '../store/SingleFavor';
// import css from "./Bidstyle.css";

const Bid = (props) => {
  const { bid } = props;
  const dispatch = useDispatch();

  const handleAcceptBid = async () => {
    await dispatch(acceptBid(bid.id, bid.favorId));
    await dispatch(fetchSingleFavor(bid.favorId));
  };

  return (
    <div className='bid-container'>
      <span id='bidder-name'>from {bid.user.name}:</span>
      <div>{bid.description}</div>

      <div>
        <span id='bid-status'>{bid.status}</span>
        <button onClick={handleAcceptBid}>Accept offer</button>
        <br />
      </div>
      <br />
    </div>
  );
};

export default Bid;
