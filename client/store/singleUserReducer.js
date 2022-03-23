import axios from 'axios';

// action constant
const SINGLE_USER = 'SINGLE_USER';

// action creator

export const setSingleUser = (user) => {
  return {
    type: SINGLE_USER,
    user,
  };
};

// thunk
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(setSingleUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer

export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
