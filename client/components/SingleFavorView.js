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
    <div>
      <h1> {favor.title}</h1>
      <br />
      <span> Status: {favor.status === "OPEN" ? "Open" : "Closed"} </span>
      {CurrentUser.id === favor.authorId ? (
        <button onClick={() => toggleFavorResolved(dispatch, favor)}>
          {favor.status === "OPEN" ? "Resolve" : "Reopen"}
        </button>
      ) : (
        <div></div>
      )}
      <h3>Description: {favor.description}</h3>
      <h2>Author: {favor.author ? favor.author.name : "Loading"}</h2>
      <h2>
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

      <br />
      <Link to="/favors">
        <button>Back to map view</button>
      </Link>
    </div>
  );
};

export default SingleFavor;
