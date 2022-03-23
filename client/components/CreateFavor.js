import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { me } from '../store/auth';
import { createProduct } from '../store/productsReducer';
import useForm from './utils/useForm';
import { useHistory } from 'react-router-dom';

function CreateFavor() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [values, handleChange] = useForm();

  const create = (e) => {
    e.preventDefault();
    console.log(values)
    dispatch(createProduct(values));
    history.push('/products');
  };

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
          <label htmlFor='price'>Price: </label>
          <input
            type='text'
            name='price'
            onChange={(event) => this.handleChange(event)}
            value={this.state.price}
          />

          <label htmlFor='favorDate'>Date: </label>
          <input
            type='date'
            name='favorDate'
            value={this.state.favorDate}
            onChange={(event) => this.handleChange(event)}
          />
          <div>
            <button type='submit' className='submit-btn'>
              Ask a Favor
            </button>
          </div>
        </form>
      </div>
    );
  }

export default CreateFavor;
