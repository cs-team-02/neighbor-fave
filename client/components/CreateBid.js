import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "./utils/useAuthHook";
import { createBid } from "../store/favors.js";
import { fetchSingleFavor } from "../store/SingleFavor";
import { me } from "../store/auth";
// NOW ADD THE REQUIRED ADDITIONS/FIXES TO favors reducer and bids route
// to accommodate this { createBid } import ^^
const CreateBid = (props) => {
  const { favor, setBidState, setDidBid } = props;
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const [message, setMessage] = useState("");

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    const newBidObj = {
      favorId: favor.id,
      status: "PENDING",
      volunteerId: currentUser.id,
      description: message,
    };
    await dispatch(createBid(newBidObj));
    await dispatch(fetchSingleFavor(favor.id));
    await dispatch(me());

    setMessage("");
    setDidBid(true);
    setBidState(false);
  };

  return (
    <div id="create-bid-form">
      <h4>Your bid: </h4>
      <p>
        Provide details for {favor.author.name} about how you can assist with{" "}
        {favor.title}
      </p>
      <form onSubmit={handleSubmitBid}>
        <label htmlFor="message"> </label>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          // type="textarea"
          rows="5"
          name="message"
          value={message}
        />
        <button type="submit">Submit bid</button>
      </form>
    </div>
  );
};

export default CreateBid;
