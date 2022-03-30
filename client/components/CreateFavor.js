import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFavor } from '../store/favors';
import useForm from './utils/useForm';
import useAuth from './utils/useAuthHook';
import { useHistory } from 'react-router-dom';
import SearchField from './geo';
import { fetchFavors } from '../store/favors';

function CreateFavor() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [values, handleChange] = useForm();
  const [latLng, setLatLng] = useState([]);
  const currentUser = useAuth();

  const create = async (e) => {
    e.preventDefault();
    //console.log(values)
    //set two different dispatch
    //one where address is provided and lat and lng are stripped out.
  //one where the lat and lng of the user are used(if box is checked)(see auth form implimentation)
    await dispatch(createFavor({...values,
      authorId: currentUser.id,
       lat: currentUser.lat,
        lng: currentUser.lng
      }));
      await dispatch(fetchFavors())
    history.push('/favors');
  };
  //const userLocation = [currentUser.lat, current.lng];

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
          {/* <br />
          <SearchField onChange={setLatLng}/>
          <br /> */}
          {/* <label htmlFor='userAddress'>Use Profile Address </label>
          <input type="checkbox"  value="bubbles" name='userAddress'/>
          <br /> */}
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
