import React from "react";
import Bid from "./Bid.js";
import CreateBid from "./CreateBid";

const BidsList = (props) => {
  const { CurrentUser, favor, bidState, setBidState } = props;

  return (
    <div>
      {CurrentUser.id === favor.authorId ? (
        favor.bids.map((bid) => {
          return <Bid key={bid.id} bid={bid} favor={favor} />;
        })
      ) : (
        <div>
          {favor.bids ? (
            favor.bids
              .filter((bid) => bid.volunteer.id === CurrentUser.id)
              .map((bid) => {
                return <Bid key={bid.id} bid={bid} favor={favor} />;
              })
          ) : (
            <div></div>
          )}
          <button
            onClick={() => {
              setBidState(true);
            }}
          >
            Offer help : {favor.title}
          </button>
          <br />
          {bidState ? <CreateBid favor={favor} /> : <div></div>}
        </div>
      )}
    </div>
  );
};

export default BidsList;
