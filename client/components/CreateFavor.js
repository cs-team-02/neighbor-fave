import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export class CreateFavor extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      imageURL: '',
      description: '',
      status: true,
      favorDate: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault(event);
    await axios.post('/api/favors/', { ...this.state });
    this.setState({
      title: '',
      imageURL: '',
      description: '',
      status: true,
      favorDate: '',
    });
    this.props.history.push(`/favors`);
  }

  render() {
    return (
      <div className='create-favor-form'>
        <div>
          <h3>Ask: </h3>
        </div>
        <hr />
        <form
          id='create-favor-form'
          onSubmit={(event) => this.handleSubmit(event)}
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
}

export default connect(null)(CreateFavor);
