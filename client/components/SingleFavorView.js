import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateBid from "./CreateBid.js";
import Bid from "./Bid.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleFavor } from "../store/SingleFavor.js";
import useAuth from "../utils/useAuthHook.js";

// const dummyFavor = {
//   id: 1,
//   name: 'cup of flour',
//   description:
//     "hello neighbors! I need a cup of flour. It must be gluten free and it needs to happen before noon today. Urgent! It's for a competitive bake-off",
//   status: 'Closed',
//   author: 'Janet',
//   lat: 51.615,
//   long: -0.09,
//   bids: [
//     {
//       id: 1,
//       description: 'I can do it today!',
//       volunteer_id: 2,
//       status: 'pending',
//     },
//     {
//       id: 2,
//       description: 'I may be able to help, but not until tomorrow',
//       volunteer_id: 1,
//       status: 'pending',
//     },
//   ],
// };
const SingleFavor = (props) => {
  // will use this id (from URL param, from route rendering the component)
  // to fetch this favor from the database and put it on app state as
  // THE singleFavor.
  // then we can use the singleFavor on state to populate this view
  const dispatch = useDispatch();
  const CurrentUser = useAuth();
  // const [status, setStatus] = useState("");
  const [bidState, setBidState] = useState(false);

  const favor =
    useSelector((state) => {
      // console.log(state.favor.user);
      return state.favor;
    }) || [];

  useEffect(() => {
    dispatch(fetchSingleFavor(props.match.params.id));
  }, []);

  return (
    <div>
      <h1>Favor: {favor.title}</h1>
      <br />
      <br />
      <span> Status: {favor.status === "OPEN" ? "Open" : "Closed"} </span>
      {CurrentUser.id === favor.authorId ? (
        <button
          onClick={() => {
            if (favor.status === "CLOSED") {
              // ADD CODE (thunk) HERE TO CHANGE FAVOR STATUS TO "OPEN" ('Reopen the ticket')
            } else {
              // ADD CODE (thunk) HERE TO CHANGE FAVOR STATUS TO "CLOSED" ('Reopen the ticket')
            }
          }}
        >
          {favor.status === "OPEN" ? "Resolve" : "Reopen"}
        </button>
      ) : (
        <div></div>
      )}
      <h3>Description: {favor.description}</h3>
      <h2>Author: {favor.user ? favor.user.name : "Loading"}</h2>
      <h2>Pending bids: {favor.bids ? favor.bids.length : "Loading"} </h2>

      {CurrentUser.id === favor.authorId ? (
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
