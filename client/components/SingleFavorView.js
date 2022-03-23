import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateBid from "./CreateBid.js";
import Bid from "./Bid.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleFavor } from "../store/SingleFavor.js";
import { updateFavor } from "../store/favors";
import useAuth from "../utils/useAuthHook.js";
import useFavor from "../utils/useFavorHook";

const SingleFavor = (props) => {
  // will use this id (from URL param, from route rendering the component)
  // to fetch this favor from the database and put it on app state as
  // THE singleFavor.
  // then we can use the singleFavor on state to populate this view
  const dispatch = useDispatch();
  const CurrentUser = useAuth();
  // const [status, setStatus] = useState("");
  const [bidState, setBidState] = useState(false);

  const favor = useFavor();

  useEffect(() => {
    dispatch(fetchSingleFavor(props.match.params.id));
  }, []);

  const toggleFavorResolved = async () => {
    if (favor.status === "CLOSED") {
      // ADD CODE (thunk) HERE TO CHANGE FAVOR STATUS TO "OPEN" ('Reopen the ticket')
      await dispatch(updateFavor(favor.id, { status: "OPEN" }));
      await dispatch(fetchSingleFavor(props.match.params.id));
    } else {
      // ADD CODE (thunk) HERE TO CHANGE FAVOR STATUS TO "CLOSED" ('Reopen the ticket')
      await dispatch(updateFavor(favor.id, { status: "CLOSED" }));
      await dispatch(fetchSingleFavor(props.match.params.id));
    }
  };

  return (
    <div>
      <h1> {favor.title}</h1>
      <br />
      <span> Status: {favor.status === "OPEN" ? "Open" : "Closed"} </span>
      {useAuth().id === favor.authorId ? (
        <button onClick={toggleFavorResolved}>
          {favor.status === "OPEN" ? "Resolve" : "Reopen"}
        </button>
      ) : (
        <div></div>
      )}
      <h3>Description: {favor.description}</h3>
      <h2>Author: {favor.user ? favor.user.name : "Loading"}</h2>
      <h2>
        {favor.bids
          ? favor.bids.length +
            ` Pending bid${favor.bids.length > 1 ? "s" : ""}`
          : "Loading"}
      </h2>

      {useAuth().id === favor.authorId ? (
        favor.bids.map((bid) => {
          return <Bid key={bid.id} bid={bid} />;
        })
      ) : (
        <div>
          <button
            onClick={() => {
              setBidState(true);
            }}
          >
            Offer help with {favor.name}
          </button>
          <br />
          <br />
          {bidState ? <CreateBid favor={favor} /> : <div></div>}
        </div>
      )}
      <br />
      <Link to="/favors">
        <button>Back to map view</button>
      </Link>
    </div>
  );
};

export default SingleFavor;
