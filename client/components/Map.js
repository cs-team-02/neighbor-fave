import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { AllFavorsList } from './AllFavorsList';
import ListView from './ListView';

// when component mounts, register the (logged in) user's location on state
// and use that for the center of the map
const userLocation = [51.615, -0.09];

const Map = (props) => {
  return (
    // change it so the center is always the (logged in) user's address
    // (will need to convert their address to lat & longitude)
    <div className='map'>
      <MapContainer center={userLocation} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
      </MapContainer>
    </div>
  );
};

export default Map;
