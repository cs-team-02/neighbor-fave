import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../utils/useAuthHook";
import { createBid } from "../store/favors.js";
import { fetchSingleFavor } from "../store/SingleFavor";

const CreateBid = (props) => {
  const { favor } = props;
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

    setMessage("");
  };

  return (
    <div>
      <h2>Bid Form</h2>
      <h4>
        Provide details for {favor.user.name} about how you can assist with{" "}
        {favor.title}
      </h4>
      <form onSubmit={handleSubmitBid}>
        <label>Message : </label>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          value={message}
        />
        <button type="submit">Submit bid</button>
      </form>
    </div>
  );
};

export default CreateBid;
