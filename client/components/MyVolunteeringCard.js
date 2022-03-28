//This component renders favor for logged in user volunteered

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';
import { RiMapPinFill } from 'react-icons/ri';

export default function MyVolunteeringCard(props) {
  const bid = props.bid;
  const favor = props.bid.favor;

  const renderVolunteersNumber = function (number) {
    if (number === 1) {
      return (
        <div>
          <b>1 Volunteer</b>
        </div>
      );
    } else {
      return (
        <div>
          <b>{number} Volunteers</b>
        </div>
      );
    }
  };

  const renderStatus = function (bid) {
    if (bid.status === 'ACCEPTED') {
      return (
        <div className='green-text'>
          <b>{bid.status}!</b>
        </div>
      );
    } else {
      return (
        <div className='grey-text'>
          <b>{bid.status}...</b>
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
      <div className='center-text-div'>
        <Link to={`/favors/${favor.id}`}>
          <b>{favor.title}</b>
        </Link>
      </div>
      <div>{favor.description}</div>
      <div>
        <RiMapPinFill className='icon-small' /> {favor.author.address}
      </div>
      <div className='center-text-div'>
        {renderVolunteersNumber(favor.bids.length)}{' '}
      </div>
      <hr />
      <div className='italic-text'>
        <b>Your offer:</b>
      </div>
      <div className='bid-card-div'>
        <div className='italic-text'></div>
        {bid.description}
        <div className='center-text-div'>{renderStatus(bid)}</div>
      </div>
    </div>
  );
}
