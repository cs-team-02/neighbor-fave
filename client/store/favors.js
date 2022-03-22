import axios from "axios";
import history from "../history";

//ACTION TYPES
const SET_FAVORS = "SET_FAVORS";
const ACCEPTED_BID = "ACCEPTED_BID";

//ACTION CREATORS
const setFavors = (favors) => ({
  type: SET_FAVORS,
  favors,
});

const acceptedTheBid = (bid, favorId) => ({
  type: ACCEPTED_BID,
  bid,
  theFavorId: favorId,
});

//THUNK CREATORS

export const fetchFavors = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/favors");
    // console.log('DATA IN THUNK', data);
    dispatch(setFavors(data));
  };
};

// thunk to update bid status in DB from "PENDING" to "ACCEPTED"
export const acceptBid = (bidId, favorId) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/bids/${bidId}`, {
      status: "ACCEPTED",
    });
    dispatch(acceptedTheBid(data, favorId));
  };
};

export default function favors(state = [], action) {
  switch (action.type) {
    case SET_FAVORS:
      return action.favors;
    case ACCEPTED_BID: {
      let updatedFavorsArray = state.map((favor) => {
        if (favor.id === action.theFavorId) {
          let updatedBidsArray = favor.bids.map((bid) => {
            if (bid.id === action.bid.id) return action.bid;
            else return bid;
          });
          favor.bids = updatedBidsArray;
          return favor;
        } else return favor;
      });
      return updatedFavorsArray;
    }
    default:
      return state;
  }
}
