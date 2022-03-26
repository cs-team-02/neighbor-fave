import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFavor } from '../store/favors';
import useForm from './utils/useForm';
import useAuth from './utils/useAuthHook';
import { useHistory } from 'react-router-dom';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


function CreateFavor() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [values, handleChange] = useForm();
  const currentUser = useAuth();
  const timeout = useRef();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const provider = new OpenStreetMapProvider();

  const handleAddress = e =>{
    setInput(e.target.value);

    if(timeout.current){
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async() => {
      const result = await provider.search({query: e.target.value});
      setResults(result);
    }, 500);
  }
  
//const results = await provider.search({ query: input.value });

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
        <div>
          <label htmlFor='address'>Address: </label>
          <input
            type='text'
            name='address'
            onChange={handleAddress} value={input}
          />
        </div>
      </div>
    );
  }

export default CreateFavor;
