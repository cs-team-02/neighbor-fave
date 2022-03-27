import React, { useState } from "react";
import Bid from "./Bid.js";
import CreateBid from "./CreateBid";

const BidsList = (props) => {
  const { CurrentUser, favor, bidState, setBidState } = props;
  // bidState is true when user has clicked button to expand section to offer a bid
  // didBid turns true when user submits bid on this favor
  const [didBid, setDidBid] = useState(false);
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
              {CurrentUser.bids.some((bid) => bid.favorId === favor.id) ||
              didBid ? (
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
          {bidState && !didBid ? (
            <CreateBid
              favor={favor}
              setBidState={setBidState}
              setDidBid={setDidBid}
            />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default BidsList;
