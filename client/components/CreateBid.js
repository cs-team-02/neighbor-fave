import React, { useState } from "react";

const CreateBid = (props) => {
  const { favor } = props;

  const [message, setMessage] = useState("");
  return (
    <div>
      <h2>Bid Form</h2>
      <h4>
        Provide details for {favor.author} about how you can assist with{" "}
        {favor.name}
      </h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(message);
          // instead of logging the message, build up an object with:
          // favor_id (set to favor.id from props), status (set to 'pending' by default),
          // volunteer_id (set to the *id of* the currently logged in user), and description (message on state)
          // and use this object to make POST request to DB to CREATE an instance of a Bid
          // example:
          // {
          //   id: 8,
          //   favor_id: favor.id,
          //   status: "pending",
          //   volunteer_id: 2,
          //   description: message,
          // });
          setMessage("");
        }}
      >
        <label>Message :</label>
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
