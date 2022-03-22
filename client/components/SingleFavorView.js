import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateBid from "./CreateBid.js";
import Bid from "./Bid.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleFavor } from "../store/SingleFavor.js";

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
  // with all details of the favor (name, description, status, author, pending bids)
  // const id = this.props.match.params.id;
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state.auth);

  // const [status, setStatus] = useState("");
  const [bidState, setBidState] = useState(false);
  // const [authorOrVolunteer, setAuthorOrVolunteer] = useState("volunteer");

  const favor =
    useSelector((state) => {
      console.log(state.favor.user);
      return state.favor;
    }) || [];

  // console.log(favor);
  useEffect(() => {
    dispatch(fetchSingleFavor(props.match.params.id));
  }, []);

  return (
    <div>
      <h1>Favor: {favor.title}</h1>
      <br />
      <br />
      {/* <button
        onClick={() => {
          setAuthorOrVolunteer(
            authorOrVolunteer === "volunteer" ? "author" : "volunteer"
          );
        }}
      >
        Toggle Author/Volunteer View
      </button> */}
      <span> Status: {favor.status === true ? "Open" : "Closed"} </span>
      {CurrentUser.id === favor.authorId ? (
        <button
          onClick={() => {
            if (favor.status === false) {
              // setStatus(true);
              // ADD CODE (thunk) HERE TO CHANGE FAVOR STATUS TO TRUE ('Reopen the ticket')
            } else {
              // setStatus(false);
              // ADD CODE (thunk) HERE TO CHANGE FAVOR STATUS TO FALSE ('Reopen the ticket')
            }
          }}
        >
          {" "}
          {favor.status === true ? "Resolve" : "Reopen"}
        </button>
      ) : (
        <div></div>
      )}
      <h3>Description: {favor.description}</h3>
      <h2>Author: {favor.user ? favor.user.name : "Loading"}</h2>
      <h2>Pending bids: {favor.bids ? favor.bids.length : "Loading"} </h2>
      {/* authorOrVolunteer === 'author'  */}
      {/* {console.log(
        "current user id is",
        CurrentUser.id,
        "author id is",
        favor.authorId
      )} */}
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
          {/* update the following condition to : bidState true AND logged in user is NOT the author
        THEN display the CreateBid component (form) */}
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
