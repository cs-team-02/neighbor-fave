import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavors } from '../store/favors';
import Map from './Map';
import { Link } from 'react-router-dom';
import { RiMapPinFill } from 'react-icons/ri';

// RADIUS in miles exports to AllUsersList.js
export const RADIUS = 1;

export default function AllFavorsList() {
  const dispatch = useDispatch();
  const favors = useSelector((state) => state.favors);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedInUser = useSelector((state) => state.auth);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchFavors());
  }, []);

  const distanceToUser = function (user) {
    const deltaLat = Math.abs(loggedInUser.lat - user.lat) * 69;
    const deltaLng = Math.abs(loggedInUser.lng - user.lng) * 69;
    return Math.sqrt(Math.pow(deltaLat, 2) + Math.pow(deltaLng, 2));
  };

  // filterFavorByNeighbors takes an array of neighborsnand returns an array of neighbors who live within a RADIUS from loggedInUser
  const filterFavorsByNeighbors = function (favorsArray) {
    function isNeighborsFavor(favor) {
      const distance = distanceToUser(favor.author);
      if (distance < RADIUS) {
        return true;
      } else {
        return false;
      }
    }
    const neighbors = favorsArray.filter(isNeighborsFavor);
    return neighbors;
  };

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

  const renderVolunteerImages = function (bids) {
    return bids.map((bid) => (
      <img className='tiny-img' src={bid.volunteer.ImageURL} />
    ));
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
    console.log('UNFILTERED FAVORS', favors);
    console.log('FILTERED FAVORS', filterFavorsByNeighbors(favors));

    return (
      <div>
        <Map favors={filterFavorsByNeighbors(favors)} />
        {filterFavorsByNeighbors(favors).map((favor) => (
          <div key={favor.id} className='side-padding-div'>
            <hr />
            <div className='grey-box'>Favor needed: {favor.favorDate}</div>
            <div>
              <Link to={`/favors/${favor.id}`}>
                <b>{favor.title}</b>
              </Link>
            </div>
            <div>{favor.description}</div>
            <div>
              <RiMapPinFill className='icon-small' /> {favor.author.address}
            </div>
            <div className='grey-text'>
              {distanceToUser(favor.author).toFixed(2)} miles away
            </div>
            <div>{renderButton(favor)}</div>
            <div className='tiny-img-wrap'>
              {renderVolunteerImages(favor.bids)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
