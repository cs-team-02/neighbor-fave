import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';

export default function VolunteeringFavorCard(props) {
  const favor = props.favor;
  const user = props.user;

  const renderButton = function () {
    if (favor.authorId === user.id) {
      return (
        <div className='orange-button'>
          <Link to={`/favors/${favor.id}`}>
            <b>Volunteer</b>
          </Link>
        </div>
      );
    }
  };

  const renderFavorAuthorName = function () {
    if (favor.authorId !== user.id) {
      return (
        <div>
          <Link to={`/users/${favor.authorId}`}>
            <b>{favor.author.name}</b>
          </Link>
        </div>
      );
    } else {
      return <div className='grey-text'>Favor needed: {favor.favorDate}</div>;
    }
  };

  return (
    <div className='card-div' key={favor.id}>
      {/* <hr /> */}
      {renderFavorAuthorName()}

      <div>
        <Link to={`/favors/${favor.id}`}>
          <b>{favor.title}</b>
        </Link>
      </div>
      <div>{favor.description}</div>
      <div className='center-text-div'>
        <b>{favor.bids.length} Volunteers</b>
      </div>
      {renderButton()}
    </div>
  );
}
