import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/usersReducer';
import { Link } from 'react-router-dom';

export default function AllUsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedInId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (users === undefined) {
    return <h3>Loading users...</h3>;
  } else if (users === 0) {
    return <h3>Couldn't find any neighbors using this app...</h3>;
  } else {
    return (
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <div className='li-div'>
              <div className='li-picture-div'>
                <img className='li-img' src={user.ImageURL} />
              </div>
              <div className='li-info-div'>
                <div>
                  <div>
                    <Link to={`/users/${user.id}`}>
                      <b>{user.name}</b>
                    </Link>
                  </div>
                  <div>{user.streetName}</div>
                  <div>
                    Asks: {user.favors.length} | Volunteering:{' '}
                    {user.bids.length}
                  </div>
                </div>
              </div>
            </div>

            <hr />
          </div>
        ))}
      </div>
    );
  }
}
