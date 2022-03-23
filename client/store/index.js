import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import favors from "./favors";
import singleFavorReducer from "./SingleFavor";
import users from "./usersReducer";
import singleUserReducer from "./singleUserReducer";

const reducer = combineReducers({
  auth,
  favors,
  favor: singleFavorReducer,
  users,
  user: singleUserReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
