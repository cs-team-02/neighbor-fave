//This component renders favor for which neighbor volunteered

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';

export default function VolunteeringCard(props) {
  const bid = props.bid;
  const favor = props.bid.favor;
  const user = props.user;
  const loggedInId = props.loggedInId;

  const renderStatus = function (bid) {
    if (bid.status === 'ACCEPTED') {
      return (
        <div className='green-text'>
          <b>{user.name}'s offer accepted!</b>
        </div>
      );
    } else {
      return <div className='grey-text'>{user.name} offered help</div>;
    }
  };

  const myFavorAskCheck = function () {
    if (favor.author.id === loggedInId) {
      return (
        <div className='orange-button'>
          {/* <Link to={`/profile`}>
          <b>You asked for this favor!</b>
        </Link> */}
          <b>Your favor ask</b>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={`/users/${favor.authorId}`}>
            <b>{favor.author.name}</b>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className='volunteer-card-div' key={favor.id}>
      {myFavorAskCheck()}
      <div className='center-text-div'>
        <Link to={`/favors/${favor.id}`}>
          <b>{favor.title}</b>
        </Link>
      </div>
      <div>{favor.description}</div>
      <div className='center-text-div'>{renderStatus(bid)}</div>
    </div>
  );
}
