import { fetchSingleFavor } from "../../store/SingleFavor.js";
import { updateFavor, updateBid } from "../../store/favors";
// NEEDS
// provide dispatch as an argument at call site
// favor
// and import thunks: updateBid, updateFavor, fetchSingleFavor
export const toggleFavorResolved = async (dispatch, favor) => {
  if (favor.status === "CLOSED") {
    if (favor.bids) {
      let rejectedBids = favor.bids.filter((bid) => bid.status === "REJECTED");
      let fulfilledBids = favor.bids.filter(
        (bid) => bid.status === "FULFILLED"
      );
      await Promise.all(
        rejectedBids.map((bid) => {
          return dispatch(updateBid(bid, { status: "PENDING" }));
        })
      );
      await Promise.all(
        fulfilledBids.map((bid) => {
          return dispatch(updateBid(bid, { status: "ACCEPTED" }));
        })
      );
    }
    await dispatch(updateFavor(favor.id, { status: "OPEN" }));
    await dispatch(fetchSingleFavor(favor.id));
  } else {
    // set the bid(s) with "ACCEPTED" status to status "FULFILLED"
    // and set all of the bids with "PENDING" status to "REJECTED"
    if (favor.bids) {
      let pendingBids = favor.bids.filter((bid) => bid.status === "PENDING");
      let acceptedBids = favor.bids.filter((bid) => bid.status === "ACCEPTED");
      await Promise.all(
        pendingBids.map((bid) => {
          return dispatch(updateBid(bid, { status: "REJECTED" }));
        })
      );
      await Promise.all(
        acceptedBids.map((bid) => {
          return dispatch(updateBid(bid, { status: "FULFILLED" }));
        })
      );
    }
    await dispatch(updateFavor(favor.id, { status: "CLOSED" }));
    await dispatch(fetchSingleFavor(favor.id));
  }
};
