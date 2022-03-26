//This component renders favor for logged in user volunteered

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';

export default function MyVolunteeringCard(props) {
  const bid = props.bid;
  const favor = props.bid.favor;

  const renderVolunteersNumber = function () {
    if (favor.bids.length === 1) {
      return (
        <div>
          <b>1 Volunteer</b>
        </div>
      );
    } else {
      return (
        <div>
          <b>{favor.bids.length} Volunteers</b>
        </div>
      );
    }
  };

  return (
    <div className='volunteer-card-div' key={favor.id}>
      <div className='grey-text'>Favor needed: {favor.favorDate}</div>
      <div>
        <Link to={`/users/${favor.authorId}`}>
          <b>{favor.author.name}</b>
        </Link>
      </div>
      <div>
        <Link to={`/favors/${favor.id}`}>
          <b>{favor.title}</b>
        </Link>
      </div>
      <div>{favor.description}</div>
      <div>{favor.author.address}</div>
      <div className='center-text-div'>{renderVolunteersNumber()} </div>
      <div className='bid-card-div'>
        {bid.description}
        <div className='center-text-div'>
          <div className='grey-text'>
            <b>{bid.status}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
