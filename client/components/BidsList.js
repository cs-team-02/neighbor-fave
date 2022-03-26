import React from "react";
import Bid from "./Bid.js";
import CreateBid from "./CreateBid";

const BidsList = (props) => {
  const { CurrentUser, favor, bidState, setBidState } = props;
  console.log(CurrentUser);
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
          {/* only render this button if user has not bidded on THIS favor already */}
          {CurrentUser.bids ? (
            <div>
              {" "}
              {CurrentUser.bids.some((bid) => bid.favorId === favor.id) ? (
                <div></div>
              ) : (
                <button
                  onClick={() => {
                    setBidState(true);
                  }}
                >
                  Offer help
                </button>
              )}
            </div>
          ) : (
            <p>Loading</p>
          )}

          <br />
          {bidState ? (
            <CreateBid favor={favor} setBidState={setBidState} />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default BidsList;
