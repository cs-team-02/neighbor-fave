import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import favors, { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';

export default function VolunteeringCard(props) {
  const favor = props.favor;

  return (
    <div key={favor.id}>
      <hr />
      <div className='grey-box'>Favor needed: {favor.favorDate}</div>
      <div>
        <Link to={`/favors/${favor.id}`}>
          <b>{favor.title}</b>
        </Link>
      </div>
      <div>{favor.description}</div>
      <div>{favor.bids.length} Volunteers</div>
    </div>
  );
}
