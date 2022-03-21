import axios from 'axios';

// action constant
const SINGLE_FAVOR = 'SINGLE_FAVOR';

// action creator

export const _getSingleFavor = (favor) => {
  return {
    type: SINGLE_FAVOR,
    favor,
  };
};

// thunk
export const fetchSingleFavor = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/favor/${id}`);
      dispatch(_getSingleFavor(data));
    } catch (error) {
      console.log(err);
    }
  };
};

// reducer

export default function singleFavorReducer(state = {}, action) {
  switch (action.type) {
    case SINGLE_FAVOR:
      return action.favor;
    default:
      return state;
  }
}
