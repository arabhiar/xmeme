import axios from "axios";

import {
  MEME_LIST_REQUEST,
  MEME_LIST_SUCCESS,
  MEME_LIST_FAIL,
  MEME_UPLOAD_REQUEST,
  MEME_UPLOAD_SUCCESS,
  MEME_UPLOAD_FAIL,
  MEME_UPDATE_REQUEST,
  MEME_BY_ID_REQUEST,
  MEME_BY_ID_SUCCESS,
  MEME_UPDATE_SUCCESS,
  MEME_UPDATE_FAIL,
} from "../constants/memeConstants";
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://xmeme-arabhiar-local.herokuapp.com/memes"
    : "http://localhost:8081/memes";

export const listMemes = () => async (dispatch) => {
  try {
    dispatch({ type: MEME_LIST_REQUEST });
    const { data } = await axios.get(BACKEND_URL);
    dispatch({ type: MEME_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: MEME_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getMemeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEME_BY_ID_REQUEST });
    const { status } = await axios.get(`${BACKEND_URL}/${id}`);
    if (status === 200) {
      dispatch({ type: MEME_BY_ID_SUCCESS });
    }
  } catch (err) {}
};

export const uploadMeme = (name, url, caption) => async (dispatch) => {
  try {
    dispatch({ type: MEME_UPLOAD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { status } = await axios.post(
      BACKEND_URL,
      { name, url, caption },
      config
    );
    if (status === 201) {
      dispatch({ type: MEME_UPLOAD_SUCCESS });
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (err) {
    dispatch({
      type: MEME_UPLOAD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateMeme = (id, url, caption) => async (dispatch) => {
  try {
    dispatch({ type: MEME_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { status } = await axios.patch(
      `${BACKEND_URL}/${id}`,
      { url, caption },
      config
    );
    if (status === 201) {
      dispatch({ type: MEME_UPDATE_SUCCESS });
    } else {
      dispatch({ type: MEME_UPDATE_FAIL });
    }
  } catch (err) {
    dispatch({
      type: MEME_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
