import {
  MEME_LIST_REQUEST,
  MEME_LIST_SUCCESS,
  MEME_LIST_FAIL,
  MEME_UPLOAD_REQUEST,
  MEME_UPLOAD_SUCCESS,
  MEME_UPLOAD_FAIL,
  MEME_UPDATE_REQUEST,
  MEME_UPDATE_SUCCESS,
  MEME_UPDATE_FAIL,
  MEME_BY_ID_REQUEST,
  MEME_BY_ID_SUCCESS,
  MEME_BY_ID_FAIL,
  MEME_UPLOAD_RESET,
  MEME_UPDATE_RESET,
} from "../constants/memeConstants";

export const memeListReducer = (state = { memes: [] }, action) => {
  switch (action.type) {
    case MEME_LIST_REQUEST:
      return { loading: true, memes: [] };
    case MEME_LIST_SUCCESS:
      return { loading: false, memes: action.payload };
    case MEME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const memeByIdReducer = (state = { meme: {} }, action) => {
  switch (action.type) {
    case MEME_BY_ID_REQUEST:
      return { loading: true, memes: {} };
    case MEME_BY_ID_SUCCESS:
      return { loading: false, memes: action.payload };
    case MEME_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const memeUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case MEME_UPLOAD_REQUEST:
      return { loading: true };
    case MEME_UPLOAD_SUCCESS:
      return { loading: false, success: true };
    case MEME_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case MEME_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const memeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEME_UPDATE_REQUEST:
      return { loading: true };
    case MEME_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MEME_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case MEME_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
