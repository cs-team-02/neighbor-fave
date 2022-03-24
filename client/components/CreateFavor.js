import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createFavor } from '../store/favors';
import useForm from './utils/useForm';
import useAuth from './utils/useAuthHook';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    //style: 'bar',
    searchLabel: 'Enter address',
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};
// import { nodeGeocoder } from 'node-geocoder';

function CreateFavor() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [values, handleChange] = useForm();
  const currentUser = useAuth();

  const create = (e) => {
    e.preventDefault();
    console.log(values)
    dispatch(createFavor({...values,authorId: currentUser.id}));
    history.push('/favors');
  };
  const userLocation = [51.615, -0.09];
  // let options = {
  //   provider: 'openstreetmap'
  // };
   
  // let geoCoder = nodeGeocoder(options);
  // geoCoder.geocode('Luray Caverns')
  // .then((res)=> {
  //   console.log(res);
  // })
  // .catch((err)=> {
  //   console.log(err);
  // });
    return (
      <div className='create-favor-form'>
            <div className='createFavorMap'>
      <MapContainer center={userLocation} zoom={13}>
        <SearchField />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            my Favor please <br /> anyone have a shovel?
          </Popup>
        </Marker> */}
      </MapContainer>
      {/* <ListView /> */}
    </div>
        <div>
          <h3>Ask: </h3>
        </div>
        <hr />
        <form
          id='create-favor-form'
          onSubmit={create}
        >
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            name='title'
            onChange={handleChange}
            value={values.title || ''}
          />
          <label htmlFor='imageURL'>Image: </label>
          <input
            type='text'
            name='imageURL'
            onChange={handleChange}
            value={values.imageURL || ''}
          />
          <label htmlFor='description'>Description: </label>
          <input
            type='text'
            name='description'
            onChange={handleChange}
            value={values.description || ''}
          />
          <label htmlFor='favorDate'>Date: </label>
          <input
            type='date'
            name='favorDate'
            onChange={handleChange}
            value={values.favorDate || ''}
          />
          <label htmlFor='lat'>Lat: </label>
          <input
            type='text'
            name='lat'
            onChange={handleChange}
            value={values.lat || ''}
          />
          <label htmlFor='lng'>Lng: </label>
          <input
            type='text'
            name='lng'
            onChange={handleChange}
            value={values.lng || ''}
          />
          <br />
          <div>
            <button className='submit-btn'>
              Ask a Favor
            </button>
          </div>
        </form>
      </div>
    );
  }

export default CreateFavor;
