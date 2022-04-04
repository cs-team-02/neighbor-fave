//This component renders neighbor's Favor Ask

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';

export default function MyFavorAskCard(props) {
  const favor = props.favor;
  const loggedInId = props.loggedInId;

  const renderVolunteersNumber = function () {
    if (favor.bids.length === 1) {
      return <b>1 Volunteer</b>;
    } else {
      return <b>{favor.bids.length} Volunteers</b>;
    }
  };

  return (
    <div className='ask-card-div' key={favor.id}>
      <div className='grey-text'>Favor needed: {favor.favorDate}</div>
      <div className='center-text-div'>
        <Link to={`/favors/${favor.id}`}>
          <b>{favor.title}</b>
        </Link>
      </div>
      <div>{favor.description}</div>
      <div className='center-text-div'>{renderVolunteersNumber()}</div>
    </div>
  );
}
