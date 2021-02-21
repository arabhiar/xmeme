import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import FormContainer from "./FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { uploadMeme } from "../actions/memeActions";
// import { MEME_UPLOAD_RESET } from "../constants/memeConstants";
import Loader from "../components/Loader";
import { listMemes } from "../actions/memeActions";
import AlertMessage from "../components/AlertMessage";

const MemeForm = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const memeUpload = useSelector((state) => state.memeUpload);
  const { success, loading, error } = memeUpload;

  useEffect(() => {
    if (success) {
      setName("");
      setUrl("");
      setCaption("");
      setValidated(false);
      dispatch(listMemes());
      // dispatch({ type: MEME_UPLOAD_RESET });
    } else if (error) {
      setName("");
      setUrl("");
      setCaption("");
      setValidated(false);
    }
  }, [dispatch, success, error]);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      dispatch(uploadMeme(name, url, caption));
      setShow(true);
    }
    setValidated(true);
  };

  const onCloseHandler = () => {
    setShow(false);
  };

  return (
    <FormContainer>
      <h1>Upload a meme.</h1>
      {show && success && (
        <AlertMessage variant="success" onCloseHandler={onCloseHandler}>
          Meme uploaded successfully
        </AlertMessage>
      )}
      {show && error && (
        <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
          {error}
        </AlertMessage>
      )}
      {loading && <Loader />}

      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="url">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a url.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="caption">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a caption.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Upload</Button>
      </Form>
    </FormContainer>
  );
};

export default MemeForm;
