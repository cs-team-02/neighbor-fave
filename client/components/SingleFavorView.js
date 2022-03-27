import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BidsList from "./BidsList.js";
import { useDispatch } from "react-redux";
import { fetchSingleFavor } from "../store/SingleFavor.js";
import useAuth from "./utils/useAuthHook.js";
import useFavor from "./utils/useFavorHook";
import { toggleFavorResolved } from "./utils/toggleFavorStatus";

const SingleFavor = (props) => {
  const dispatch = useDispatch();
  const [bidState, setBidState] = useState(false);
  const CurrentUser = useAuth();
  const favor = useFavor();

  useEffect(() => {
    dispatch(fetchSingleFavor(props.match.params.id));
  }, []);

  return (
    <div id="single-favor-container">
      {/* <Link to="/favors">
        <button>Back to map view</button>
      </Link> */}
      <br />

      <h1> {favor.title} </h1>
      <span id="favor-status">
        ({favor.status === "OPEN" ? "Open" : "Closed"})
      </span>
      {CurrentUser.id === favor.authorId ? (
        <button onClick={() => toggleFavorResolved(dispatch, favor)}>
          {favor.status === "OPEN" ? "Resolve" : "Reopen"}
        </button>
      ) : (
        <div></div>
      )}

      <p id="favor-author">{favor.author ? favor.author.name : "Loading"}:</p>

      <p id="favor-description"> "{favor.description}"</p>

      <div id="all-bids-container">
        <p id="favors-pending-bids">
          {favor.bids
            ? favor.bids.length +
              ` Pending bid${favor.bids.length > 1 ? "s" : ""}`
            : "Loading"}
        </p>
        <BidsList
          CurrentUser={CurrentUser}
          favor={favor}
          bidState={bidState}
          setBidState={setBidState}
        />
      </div>
    </div>
  );
};

export default SingleFavor;
