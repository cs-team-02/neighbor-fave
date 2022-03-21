import axios from 'axios';
import history from '../history';

//ACTION TYPES
const SET_FAVORS = 'SET_FAVORS';

//ACTION CREATORS
const setFavors = (favors) => ({
  type: SET_FAVORS,
  favors,
});

//THUNK CREATORS

export const fetchFavors = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/favors');
    // console.log('DATA IN THUNK', data);
    dispatch(setFavors(data));
  };
};

export default function favors(state = [], action) {
  switch (action.type) {
    case SET_FAVORS:
      return action.favors;
    default:
      return state;
  }
}
