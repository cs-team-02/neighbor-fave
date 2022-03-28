import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';

export default function AllFavorsList() {
  const dispatch = useDispatch();
  const favors = useSelector((state) => state.favors);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchFavors());
  }, []);

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

  const renderButton = function (favor) {
    if (loggedInId === favor.authorId) {
      return (
        <div className='orange-button'>
          <Link to={`/favors/${favor.id}`}>
            <b>Your ask: {renderVolunteersNumber(favor.bids.length)}</b>
          </Link>
        </div>
      );
    } else {
      return (
        <div className='center-text-div'>
          {renderVolunteersNumber(favor.bids.length)}
        </div>
      );
    }
  };

  if (favors === undefined) {
    return <h3>Loading favors...</h3>;
  } else if (favors === 0) {
    return <h3>Looks like noone needs a favor...</h3>;
  } else {
    return (
      <div>
        <Map favors={favors} />
        {favors.map((favor) => (
          <div key={favor.id} className='side-padding-div'>
            <hr />
            <div className='grey-box'>Favor needed: {favor.favorDate}</div>
            <div>
              <Link to={`/favors/${favor.id}`}>
                <b>{favor.title}</b>
              </Link>
            </div>
            <div>{favor.description}</div>
            <div>{favor.author.address}</div>
            <div>{renderButton(favor)}</div>
          </div>
        ))}
      </div>
    );
  }
}
