import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserReducer';
import { fetchFavors } from '../store/favors';
import { Link } from 'react-router-dom';
import VolunteeringCard from './VolunteeringCard';

export default function SingleUserView(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favors = useSelector((state) => state.favors);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchSingleUser(props.match.params.id));
    dispatch(fetchFavors());
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

  const volunteeringCard = function () {
    if (user.favors === undefined || user.favors === []) {
      return 0;
    } else {
      return (
        <div>
          {user.favors.map((favor) => (
            <VolunteeringCard favor={favor} />
          ))}
        </div>
      );
    }
  };
  // const voluneeringCard = function () {};

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
              <b>{user.name}'s Favor Asks:</b>
            </div>
            <hr />
            <div>Active: {favorsTally()}</div>
          </div>
          <div>
            <div>
              <b>{user.name}'s Volunteering:</b>
            </div>
            <hr />
            <div>Active: {bidsTally()}</div>
            <div>{volunteeringCard()}</div>
          </div>
        </div>
      </div>
    );
  }
}
