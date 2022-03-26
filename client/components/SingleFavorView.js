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
      <h1>
        {" "}
        {favor.title}{" "}
        <span id="favor-status">
          ({favor.status === "OPEN" ? "Open" : "Closed"})
        </span>
      </h1>
      <br />

      {CurrentUser.id === favor.authorId ? (
        <button onClick={() => toggleFavorResolved(dispatch, favor)}>
          {favor.status === "OPEN" ? "Resolve" : "Reopen"}
        </button>
      ) : (
        <div></div>
      )}

      <span id="favor-author">
        {favor.author ? favor.author.name : "Loading"}:
      </span>

      <span id="favor-description"> "{favor.description}"</span>
      <div id="all-bids-container">
        <h2 id="favors-pending-bids">
          {favor.bids
            ? favor.bids.length +
              ` Pending bid${favor.bids.length > 1 ? "s" : ""}`
            : "Loading"}
        </h2>
        <BidsList
          CurrentUser={CurrentUser}
          favor={favor}
          bidState={bidState}
          setBidState={setBidState}
        />
      </div>

      <br />
      <Link to="/favors">
        <button>Back to map view</button>
      </Link>
    </div>
  );
};

export default SingleFavor;
