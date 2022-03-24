import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { AllFavorsList } from "./AllFavorsList";
import ListView from "./ListView";

// when component mounts, register the (logged in) user's location on state
// and use that for the center of the map
const userLocation = [51.615, -0.09];

const dummyData = [
  { id: 1, name: "mow my lawn please", lat: 51.615, long: -0.09 },
  { id: 2, name: "cup of flour", lat: 51.605, long: -0.09 },
  { id: 3, name: "shovel driveway", lat: 51.611, long: -0.09 },
  { id: 4, name: "help moving couch", lat: 51.611, long: -0.1 },
  { id: 5, name: "walk my dog on saturday", lat: 51.621, long: -0.095 },
  { id: 6, name: "borrow a ladder", lat: 51.618, long: -0.092 },
  { id: 7, name: "someone ran over my mailbox", lat: 51.615, long: -0.11 },
];
const Map = (props) => {
  return (
    // change it so the center is always the (logged in) user's address
    // (will need to convert their address to lat & longitude)
    <div className="map">
      <MapContainer center={userLocation} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.favors
          ? props.favors.map((favor) => {
              return (
                <Marker key={favor.id} position={[favor.lat, favor.lng]}>
                  <Popup>
                    <Link to={`/favors/${favor.id}`}>{favor.title}</Link>
                  </Popup>
                </Marker>
              );
            })
          : dummyData.map((favor) => {
              return (
                <Marker key={favor.id} position={[favor.lat, favor.long]}>
                  <Popup>
                    <Link to={`/favors/${favor.id}`}>{favor.name}</Link>
                  </Popup>
                </Marker>
              );
            })}
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            my Favor please <br /> anyone have a shovel?
          </Popup>
        </Marker> */}
      </MapContainer>
      {/* <ListView /> */}
    </div>
  );
};

export default Map;
