import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  memeListReducer,
  memeUploadReducer,
  memeUpdateReducer,
  memeByIdReducer,
} from "./reducers/memeReducers";

const reducer = combineReducers({
  memeList: memeListReducer,
  memeById: memeByIdReducer,
  memeUpload: memeUploadReducer,
  memeUpdate: memeUpdateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
