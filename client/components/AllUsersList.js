import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/usersReducer';
import { Link } from 'react-router-dom';
import { RiMapPinFill } from 'react-icons/ri';
import { RADIUS } from './AllFavorsList';
import { useHistory } from 'react-router-dom';

export default function AllUsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedInUser = useSelector((state) => state.auth);
  const loggedIn = useSelector((state) => !!state.auth.id);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const distanceToUser = function (user) {
    const deltaLat = Math.abs(loggedInUser.lat - user.lat) * 69;
    const deltaLng = Math.abs(loggedInUser.lng - user.lng) * 69;
    return Math.sqrt(Math.pow(deltaLat, 2) + Math.pow(deltaLng, 2));
  };

  // can this be a custom hook to filter favors by status?
  const openFavors = function (favors) {
    const openFavors = favors.filter(
      (favor) => favor.status === 'OPEN' || favor.status === 'ASSIGNED'
    );
    return openFavors;
  };
  // can this be a custom hook to filter bids by favor status?
  const openBids = function (bids) {
    const openBids = bids.filter(
      (bid) => bid.favor.status === 'OPEN' || bid.favor.status === 'ASSIGNED'
    );
    return openBids;
  };

  const neighborsFilter = function (users, filteredId) {
    function isNeighbor(user) {
      const distance = distanceToUser(user);
      if (distance < RADIUS) {
        return true;
      } else {
        return false;
      }
    }

    const neighborFilter = users
      .filter(isNeighbor)
      .filter((user) => user.id !== filteredId);
    return neighborFilter;
  };

  if (users === undefined) {
    return <h3>Loading users...</h3>;
  } else if (users === 0) {
    return <h3>Couldn't find any neighbors using this app...</h3>;
  } else {
    return (
      <div className='list-wrapper'>
        <div className='side-padding-div'>
          <div className='center-text-div'>
            <button
              className='small-button'
              onClick={() => history.push(`/topContributors`)}
            >
              See Top Contributors
            </button>

            <div className='spacer-div' />
            <hr />
          </div>
          {neighborsFilter(users, loggedInId).map((user, index) => (
            <div
              key={index}
              onClick={() => history.push(`/users/${user.id}`)}
              className='clickable-div'
            >
              <div className='li-div'>
                <div className='li-img-div'>
                  <img className='li-img' src={user.ImageURL} />
                </div>
                <div className='li-info-div'>
                  <div>
                    <div>
                      {/* <Link to={`/users/${user.id}`}> */}
                      <b>{user.name}</b>
                      {/* </Link> */}
                    </div>
                    <div>
                      <RiMapPinFill className='icon-small' />{' '}
                      {user.streetNumber} {user.streetName}
                    </div>
                    <div>
                      Asks: {openFavors(user.favors).length} | Volunteering:{' '}
                      {openBids(user.bids).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
