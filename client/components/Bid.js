import React from "react";
// import css from "./Bidstyle.css";

const Bid = (props) => {
  const { bid } = props;

  // method to change bid to accepted
  // THUNK to make that change to that bid in the DB and update redux store
  // PUT /bids/:bidId {status: 'ACCEPTED'}
  return (
    <div class="bid-container">
      {console.log("bid object:", bid)}
      <span id="bidder-name">from {bid.user.name}:</span>
      <div>{bid.description}</div>

      <div>
        <span id="bid-status">{bid.status}</span>
        <button
          onClick={() =>
            console.log(`accepted offer from user # ${bid.volunteerId}`)
          }
        >
          Accept offer
        </button>
        <br />
      </div>
      <br />
    </div>
  );
};

export default Bid;
