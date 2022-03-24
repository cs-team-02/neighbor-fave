import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserReducer';
import { fetchFavors } from '../store/favors';
import { Link } from 'react-router-dom';
import VolunteeringFavorCard from './VolunteeringCard';

export default function SingleUserView(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchSingleUser(props.match.params.id));
  }, []);

  const favorsTally = function () {
    if (user.favors === undefined) {
      return 0;
    } else {
      return user.favors.length;
    }
  };

  const bidsTally = function () {
    if (user.bids === undefined) {
      return 0;
    } else {
      return user.bids.length;
    }
  };

  if (user === undefined) {
    return <h3>Loading user...</h3>;
  } else {
    return (
      <div>
        <div className='user-info-card'>
          <img src={user.ImageUrl} />
          <div>
            <b>{user.name}</b>
          </div>
          <div>{user.address}</div>
          <hr />
        </div>
        <div>
          <div>
            <div>
              <b>
                {user.name}'s Favor Asks: <b>{favorsTally()}</b>
              </b>
            </div>
            <hr />
            {/* <div>Active: {favorsTally()}</div> */}
            <div>
              {user.favors &&
                user.favors.map((favor) => (
                  <VolunteeringFavorCard favor={favor} user={user} />
                ))}
            </div>
          </div>
          <div>
            <div>
              <b>
                {user.name}'s Volunteering: <b>{bidsTally()}</b>
              </b>
            </div>
            <hr />
            {/* <div>Active: {bidsTally()}</div> */}
            <div>
              {user.bids &&
                user.bids.map((bid) => (
                  <VolunteeringFavorCard favor={bid.favor} user={user} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
