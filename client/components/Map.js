import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import useAuth from './utils/useAuthHook'



const Map = (props) => {
  const currentUser = useAuth();

  const userLocation = [currentUser.lat, currentUser.lng];
  return currentUser ? (
    <div className='map'>
      <MapContainer center={userLocation} zoom={17}>
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
          : (null )}
      </MapContainer>
    </div>
  ):( "loading")
};

export default Map;
