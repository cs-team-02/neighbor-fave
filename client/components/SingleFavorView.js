import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      volunteer_id: 2,
      status: "pending",
    },
    {
      id: 2,
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

  useEffect(() => {
    setStatus(dummyFavor.status);
  }, []);

  return (
    <div>
      <h1>Favor: {dummyFavor.name}</h1>
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

      <button>Offer help with {dummyFavor.name}</button>
      <br />
      <br />

      <Link to="/mapView">
        <button>Back to map view</button>
      </Link>
    </div>
  );
};

export default SingleFavor;
