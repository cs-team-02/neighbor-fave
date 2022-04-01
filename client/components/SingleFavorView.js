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
      <div id="favor-info-and-picture">
        <div>
          <p id="favor-heading">{favor.title} </p>
          <span id="favor-status">
            Favor is {favor.status === "OPEN" ? "Open" : "Closed"}
          </span>{" "}
          <span>
            {CurrentUser.id === favor.authorId ? (
              <button onClick={() => toggleFavorResolved(dispatch, favor)}>
                {favor.status === "OPEN" ? "Resolve" : "Reopen"}
              </button>
            ) : (
              <div></div>
            )}
          </span>
          <br />
        </div>

        <div id="favor-img-container">
          {favor.ImageURL ? (
            <img height="200px" width="200px" src={favor.ImageURL} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <hr></hr>

      <p id="favor-author">{favor.author ? favor.author.name : "Loading"}:</p>
      <p id="favor-description"> "{favor.description}"</p>
      <hr></hr>
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
