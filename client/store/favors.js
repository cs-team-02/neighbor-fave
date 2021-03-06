import axios from "axios";

//ACTION TYPES  -------------------------------------------
const SET_FAVORS = "SET_FAVORS";
const CREATE_FAVOR = "CREATE_FAVOR";

const UPDATED_BID = "UPDATED_BID";

const CREATED_BID = "CREATED_BID";
const UPDATED_FAVOR = "UPDATED_FAVOR";

//ACTION CREATORS -------------------------------------------
const setFavors = (favors) => ({
  type: SET_FAVORS,
  favors,
});

const favorCreate = (favor) => ({
  type: CREATE_FAVOR,
  favor,
});

const updatedTheBid = (bid) => ({
  type: UPDATED_BID,
  bid,
});

const createdABid = (bid) => ({
  type: CREATED_BID,
  bid,
});

const updatedTheFavor = (favor) => ({
  type: UPDATED_FAVOR,
  favor,
});

//THUNK CREATORS  -------------------------------------------

export const fetchFavors = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/favors");
    // console.log('DATA IN THUNK', data);
    dispatch(setFavors(data));
  };
};

export const createFavor = (favor) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/favors", favor);
      dispatch(favorCreate(data));
    } catch (err) {
      console.log(err);
    }
  };
};
// thunk to update bid in DB (to change status from "PENDING"/"ACCEPTED"/"REJECTED"/"FUFILLED")
export const updateBid = (bid, bidUpdateObj) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/bids/${bid.id}`, bidUpdateObj);
      dispatch(updatedTheBid(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// thunk to create a bid in DB and update store
export const createBid = (newBidObj) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/bids", newBidObj);
      dispatch(createdABid(data));
    } catch (error) {
      console.log("error creating new bid in the DB via thunk", error);
    }
  };
};

// thunk to update a favor in the DB and update the store
export const updateFavor = (favorId, updateObject) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/favors/${favorId}`, updateObject);
      dispatch(updatedTheFavor(data));
    } catch (error) {
      console.log("error updating favor in DB", error);
    }
  };
};
// subreducer -------------------------------------------
export default function favors(state = [], action) {
  switch (action.type) {
    case SET_FAVORS:
      return action.favors;
    case CREATE_FAVOR:
      return [...favors, action.favor];
    case UPDATED_BID: {
      let updatedFavorsArray = state.map((favor) => {
        if (favor.id === action.bid.favorId) {
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
    case CREATED_BID: {
      let updatedFavorsArray = state.map((favor) => {
        if (favor.id === action.bid.favorId) {
          let updatedBidsArray = [...favor.bids, bid];
          favor.bids = updatedBidsArray;
          return favor;
        } else return favor;
      });
      return updatedFavorsArray;
    }
    case UPDATED_FAVOR:
      return state.map((favor) => {
        if (favor.id === action.favor.id) return action.favor;
        else return favor;
      });

    default:
      return state;
  }
}
