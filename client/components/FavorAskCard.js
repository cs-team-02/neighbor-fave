//This component renders neighbor's Favor Ask

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';
import { RiMapPinFill } from 'react-icons/ri';

export default function FavorAskCard(props) {
  const favor = props.favor;
  const loggedInId = props.loggedInId;

  const renderVolunteersNumber = function () {
    if (favor.bids.length === 1) {
      return <b>1 Volunteer</b>;
    } else {
      return <b>{favor.bids.length} Volunteers</b>;
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

  const renderVolunteerButton = function () {
    const loggedInUserBid = favor.bids.find(
      (bid) => bid.volunteerId === loggedInId
    );
    if (loggedInUserBid) {
      return (
        <div>
          <div className='grey-text'>
            <b>You are volunteering!</b>
          </div>
          <div>{renderStatus(loggedInUserBid)}</div>
        </div>
      );
    } else {
      return (
        <div className='orange-button'>
          <Link to={`/favors/${favor.id}`}>
            <b>Volunteer</b>
          </Link>
        </div>
      );
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
      <div className='small-spacer-div'></div>
      <div className='center-text-div'>{renderVolunteerButton()}</div>
    </div>
  );
}
