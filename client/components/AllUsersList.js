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

  //   const renderFavorsTally = function (user) {
  //     if (loggedInId === user.authorId) {
  //       return (
  //         <div className='orange-button'>
  //           <b>Your ask: {favor.bids.length} Volunteers</b>
  //         </div>
  //       );
  //     } else {
  //       return <div>{favor.bids.length} Volunteers</div>;
  //     }
  //   };

  if (users === undefined) {
    return <h3>Loading users...</h3>;
  } else if (users === 0) {
    return <h3>Couldn't find any neighbors using this app...</h3>;
  } else {
    return (
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <img src={user.ImageURL} />
            <div>
              <Link to={`/favors/${user.id}`}>{user.name}</Link>
            </div>
            <div>{user.address}</div>
            {/* <div>{renderButton(favor)}</div> */}
            <hr />
          </div>
        ))}
      </div>
    );
  }
}
