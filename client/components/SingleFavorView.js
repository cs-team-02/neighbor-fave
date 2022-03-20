import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateBid from "./CreateBid.js";

const dummyFavor = {
  id: 1,
  name: "cup of flour",
  description:
    "hello neighbors! I need a cup of flour. It must be gluten free and it needs to happen before noon today. Urgent! It's for a competitive bake-off",
  status: "Closed",
  author: "Janet",
  lat: 51.615,
  long: -0.09,
  bids: [
    {
      id: 1,
      description: "I can do it today!",
      volunteer_id: 2,
      status: "pending",
    },
    {
      id: 2,
      description: "I may be able to help, but not until tomorrow",
      volunteer_id: 1,
      status: "pending",
    },
  ],
};
const SingleFavor = () => {
  // will use this id (from URL param, from route rendering the component)
  // to fetch this favor from the database and put it on app state as
  // THE singleFavor.

  // then we can use the singleFavor on state to populate this view
  // with all details of the favor (name, description, status, author, pending bids)
  // const id = this.props.match.params.id;

  const [status, setStatus] = useState("");
  const [bidState, setBidState] = useState(false);
  const [authorOrVolunteer, setAuthorOrVolunteer] = useState("volunteer");

  useEffect(() => {
    setStatus(dummyFavor.status);
  }, []);

  return (
    <div>
      <h1>Favor: {dummyFavor.name}</h1>
      <button
        onClick={() => {
          setAuthorOrVolunteer(
            authorOrVolunteer === "volunteer" ? "author" : "volunteer"
          );
        }}
      >
        Toggle Author/Volunteer View
      </button>
      <br />
      <br />
      <span> Status: {status} </span>
      <button
        onClick={() => {
          if (status === "Open") {
            console.log("status is open");
            setStatus("Closed");
          } else {
            console.log("status is closed");
            setStatus("Open");
          }
        }}
      >
        {" "}
        {status === "Open" ? "Resolve" : "Reopen"}{" "}
      </button>

      <h2>Description: {dummyFavor.description}</h2>
      <h2>Author: {dummyFavor.author}</h2>
      <h2>{dummyFavor.bids.length} Pending bids</h2>

      {authorOrVolunteer === "author" ? (
        dummyFavor.bids.map((bid) => {
          return (
            <div key={bid.id}>
              Bid from User #{bid.volunteer_id}: {bid.description}{" "}
              <button
                onClick={() =>
                  console.log(`accepted offer from user # ${bid.volunteer_id}`)
                }
              >
                Accept offer
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <button
            onClick={() => {
              setBidState(true);
            }}
          >
            Offer help with {dummyFavor.name}
          </button>
          <br />
          <br />
          {/* update the following condition to : bidState true AND logged in user is NOT the author
        THEN display the CreateBid component (form) */}
          {bidState ? <CreateBid favor={dummyFavor} /> : <div></div>}
        </div>
      )}

      <br />
      <br />
      <Link to="/mapView">
        <button>Back to map view</button>
      </Link>
    </div>
  );
};

export default SingleFavor;
