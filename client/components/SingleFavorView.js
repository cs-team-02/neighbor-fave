import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateBid from "./CreateBid.js";
import Bid from "./Bid.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleFavor } from "../store/SingleFavor.js";
import { updateFavor, updateBid } from "../store/favors";
import useAuth from "./utils/useAuthHook.js";
import useFavor from "./utils/useFavorHook";

const SingleFavor = (props) => {
  // will use this id (from URL param, from route rendering the component)
  // to fetch this favor from the database and put it on app state as
  // THE singleFavor.
  // then we can use the singleFavor on state to populate this view
  const dispatch = useDispatch();
  const CurrentUser = useAuth();

  const [bidState, setBidState] = useState(false);

  const favor = useFavor();

  useEffect(() => {
    dispatch(fetchSingleFavor(props.match.params.id));
  }, []);

  const toggleFavorResolved = async () => {
    if (favor.status === "CLOSED") {
      if (favor.bids) {
        let rejectedBids = favor.bids.filter(
          (bid) => bid.status === "REJECTED"
        );
        let fulfilledBids = favor.bids.filter(
          (bid) => bid.status === "FULFILLED"
        );
        await Promise.all(
          rejectedBids.map((bid) => {
            return dispatch(updateBid(bid, { status: "PENDING" }));
          })
        );
        await Promise.all(
          fulfilledBids.map((bid) => {
            return dispatch(updateBid(bid, { status: "ACCEPTED" }));
          })
        );
      }
      await dispatch(updateFavor(favor.id, { status: "OPEN" }));
      await dispatch(fetchSingleFavor(props.match.params.id));
    } else {
      // set the bid(s) with "ACCEPTED" status to status "FULFILLED"
      // and set all of the bids with "PENDING" status to "REJECTED"
      if (favor.bids) {
        let pendingBids = favor.bids.filter((bid) => bid.status === "PENDING");
        let acceptedBids = favor.bids.filter(
          (bid) => bid.status === "ACCEPTED"
        );
        await Promise.all(
          pendingBids.map((bid) => {
            return dispatch(updateBid(bid, { status: "REJECTED" }));
          })
        );
        await Promise.all(
          acceptedBids.map((bid) => {
            return dispatch(updateBid(bid, { status: "FULFILLED" }));
          })
        );
      }
      await dispatch(updateFavor(favor.id, { status: "CLOSED" }));
      await dispatch(fetchSingleFavor(props.match.params.id));
    }
  };

  return (
    <div>
      <h1> {favor.title}</h1>
      <br />
      <span> Status: {favor.status === "OPEN" ? "Open" : "Closed"} </span>
      {CurrentUser.id === favor.authorId ? (
        <button onClick={toggleFavorResolved}>
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
