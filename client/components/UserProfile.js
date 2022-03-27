import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserReducer';
import { fetchFavors } from '../store/favors';
import { Link } from 'react-router-dom';
import MyVolunteeringCard from './MyVolunteeringCard';
import MyFavorAskCard from './MyFavorAskCard';
import { RiMapPinFill } from 'react-icons/ri';

export default function UserProfile(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchSingleUser(loggedInId));
  }, []);

  // ensureArray only returns array if it is defined

  const ensureArray = function (array) {
    if (array === undefined) {
      return [];
    } else {
      return array;
    }
  };

  // openFavors and openBids takes arrays of favors, bids and returns only active favors, bids for active favors
  const openFavors = function (favors) {
    const openFavors = favors.filter(
      (favor) => favor.status === 'OPEN' || favor.status === 'ASSIGNED'
    );
    return openFavors;
  };
  const openBids = function (bids) {
    const openBids = bids.filter(
      (bid) => bid.favor.status === 'OPEN' || bid.favor.status === 'ASSIGNED'
    );
    return openBids;
  };

  if (user === undefined) {
    return <h3>Loading user...</h3>;
  } else {
    return (
      <div>
        <div className='user-info-card'>
          <div className='spacer-div'></div>
          <div className='center-text-div'>
            <img className='profile-img' src={user.ImageURL} />
          </div>
          <div className='center-text-div'>
            <b>{user.name}</b>
          </div>
          <div className='center-text-div'>
            <RiMapPinFill className='icon-small' /> {user.address}
          </div>
          <div className='spacer-div' />
        </div>
        <div>
          <div>
            <div>
              <b>
                My Favor Asks:{' '}
                <b>{openFavors(ensureArray(user.favors)).length}</b>
              </b>
            </div>
            <hr />
            <div>
              {user.favors &&
                openFavors(user.favors).map((favor) => (
                  <MyFavorAskCard
                    favor={favor}
                    user={user}
                    loggedInId={loggedInId}
                  />
                ))}
            </div>
          </div>
          <div>
            <div className='spacer-div'></div>
            <div>
              <b>
                My Volunteering:{' '}
                <b>{openBids(ensureArray(user.bids)).length}</b>
              </b>
            </div>
            <hr />
            <div>
              {user.bids &&
                openBids(user.bids).map((bid) => (
                  <MyVolunteeringCard bid={bid} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
