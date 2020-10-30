import { combineReducers, createStore } from "redux";
import playListReducer from "./reducer/playListReducer";
import SnackBarReducer from "./reducer/SnackBarReducer";

const rootReducer = combineReducers({
  playListReducer,
  SnackBarReducer,
});
export let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
