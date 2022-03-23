import axios from 'axios';
import history from '../history';

//ACTION TYPES
const SET_FAVORS = 'SET_FAVORS';
const CREATE_FAVOR = 'CREATE_FAVOR';

//ACTION CREATORS
const setFavors = (favors) => ({
  type: SET_FAVORS,
  favors,
});

const productCreate = (favor) => ({ 
   type: CREATE_FAVOR,
    favor,
});

//THUNK CREATORS

export const fetchFavors = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/favors');
    // console.log('DATA IN THUNK', data);
    dispatch(setFavors(data));
  };
};

export const createFavor = (favor) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/favors', favor);
      dispatch(favorCreate(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function favors(state = [], action) {
  switch (action.type) {
    case SET_FAVORS:
      return action.favors;
    case CREATE_FAVOR:
      return [...favors, action.favor];
    default:
      return state;
  }
}
