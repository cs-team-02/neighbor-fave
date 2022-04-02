import React from "react";
import { Link } from "react-router-dom";

const dummyData = [
  { id: 1, name: "mow our lawn please", lat: 51.615, long: -0.09 },
  { id: 2, name: "cup of flour", lat: 51.605, long: -0.09 },
  { id: 3, name: "shovel driveway", lat: 51.611, long: -0.09 },
  { id: 4, name: "help moving couch", lat: 51.611, long: -0.12 },
  { id: 5, name: "walk my dog on saturday", lat: 51.621, long: -0.95 },
  { id: 6, name: "borrow a ladder", lat: 51.618, long: -0.92 },
  { id: 7, name: "someone ran over my mailbox", lat: 51.615, long: -0.11 },
];

const ListView = () => {
  return (
    <div>
      {dummyData.map((favor) => {
        return (
          <Link to="/favors/1" key={favor.id}>
            <p>{favor.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ListView;
