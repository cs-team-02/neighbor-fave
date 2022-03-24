// import React, { useState } from "react";

// const CreateBid = (props) => {
//   const { favor } = props;

//   const [message, setMessage] = useState("");
//   return (
//     <div>
//       <h2>Bid Form</h2>
//       <h4>
//         Provide details for {favor.author} about how you can assist with{" "}
//         {favor.name}
//       </h4>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           console.log(message);
//           // instead of logging the message, build up an object with:
//           // favor_id (set to favor.id from props), status (set to 'pending' by default),
//           // volunteer_id (set to the *id of* the currently logged in user), and description (message on state)
//           // and use this object to make POST request to DB to CREATE an instance of a Bid
//           // example:
//           // {
//           //   id: 8,
//           //   favor_id: favor.id,
//           //   status: "pending",
//           //   volunteer_id: 2,
//           //   description: message,
//           // });
//           setMessage("");
//         }}
//       >
//         <label>Message :</label>
//         <input
//           onChange={(e) => setMessage(e.target.value)}
//           type="text"
//           name="message"
//           value={message}
//         />
//         <button type="submit">Submit bid</button>
//       </form>
//     </div>
//   );
// };

// export default CreateBid;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "./utils/useAuthHook";
import { createBid } from "../store/favors.js";
import { fetchSingleFavor } from "../store/SingleFavor";
// NOW ADD THE REQUIRED ADDITIONS/FIXES TO favors reducer and bids route
// to accommodate this { createBid } import ^^
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
        Provide details for {favor.author.name} about how you can assist with{" "}
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
