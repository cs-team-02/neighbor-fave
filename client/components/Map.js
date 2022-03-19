import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

// when component mounts, register the (logged in) user's location on state
// and use that for the center of the map
const userLocation = [51.615, -0.09];

const dummyData = [
  { id: 1, name: "cup of sugar", lat: 51.615, long: -0.09 },
  { id: 2, name: "cup of flour", lat: 51.605, long: -0.09 },
];
const Map = () => {
  return (
    // change it so the center is always the (logged in) user's address
    // (will need to convert their address to lat & longitude)
    <MapContainer center={userLocation} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {dummyData.map((favor) => {
        return (
          <Marker key={favor.id} position={[favor.lat, favor.long]}>
            <Popup>
              <Link to={`/favors/1`}>{favor.name}</Link>
            </Popup>
          </Marker>
        );
      })}
      <Marker position={[51.505, -0.09]}>
        <Popup>
          my Favor please <br /> anyone have a shovel?
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
