import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserReducer';
import { fetchFavors } from '../store/favors';
import { Link } from 'react-router-dom';
import VolunteeringCard from './VolunteeringCard';
import FavorAskCard from './FavorAskCard';
import { RiMapPinFill } from 'react-icons/ri';

export default function SingleUserView(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchSingleUser(props.match.params.id));
  }, [props.match.params.id]);

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
      <div className='side-padding-div'>
        <div className='user-info-card'>
          <div className='spacer-div'></div>
          <div className='center-text-div'>
            <img className='profile-img' src={user.ImageURL} />
          </div>
          <div className='center-text-div'>
            <b>{user.name}</b>
          </div>
          <div className='center-text-div'>
            <RiMapPinFill className='icon-small' /> {user.streetName}
          </div>
          <div className='spacer-div' />
        </div>
        <div>
          <div>
            <div>
              <b>
                {user.name}'s Favor Asks:{' '}
                <b>{user.favors && openFavors(user.favors).length}</b>
              </b>
            </div>
            <hr />
            <div>
              {user.favors &&
                openFavors(user.favors).map((favor) => (
                  <FavorAskCard favor={favor} loggedInId={loggedInId} />
                ))}
            </div>
          </div>
          <div>
            <div className='spacer-div'></div>
            <div>
              <b>
                {user.name}'s Volunteering:{' '}
                <b>{user.bids && openBids(user.bids).length}</b>
              </b>
            </div>
            <hr />
            <div>
              {user.bids &&
                openBids(user.bids).map((bid) => (
                  <VolunteeringCard
                    bid={bid}
                    user={user}
                    loggedInId={loggedInId}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
