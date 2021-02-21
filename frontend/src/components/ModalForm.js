import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import AlertMessage from "../components/AlertMessage";
import Loader from "./Loader";
import { listMemes, updateMeme } from "../actions/memeActions";
import { MEME_UPDATE_RESET } from "../constants/memeConstants";

const ModalForm = (props) => {
  const { show, handleClose, memeId } = props;
  const dispatch = useDispatch();

  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [validated, setValidated] = useState(false);

  //   console.log("memeId", memeId);

  const memeList = useSelector((state) => state.memeList);
  //   console.log(memeList.memes);
  const currMeme = memeList.memes.find((meme) => {
    return meme._id === memeId.toString();
  });

  //   console.log(currMeme);

  const memeUpdate = useSelector((state) => state.memeUpdate);
  const { loading, success, error } = memeUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: MEME_UPDATE_RESET });
      //   renderHomeScreen();
      dispatch(listMemes());
    } else {
      setNewUrl(currMeme.url);
      setNewCaption(currMeme.caption);
    }
  }, [dispatch, currMeme, success]);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      dispatch(updateMeme(memeId, newUrl, newCaption));
      setShowAlert(true);
    }
    setValidated(true);
  };
  const onCloseHandler = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit the meme.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {showAlert && success && (
                <AlertMessage variant="success" onCloseHandler={onCloseHandler}>
                  Meme uploaded successfully
                </AlertMessage>
              )}
              {showAlert && error && (
                <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
                  {error}
                </AlertMessage>
              )}
              {loading && <Loader />}

              <Form.Group controlId="name-read-only">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={currMeme.name}
                  readOnly
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="url-edit">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a url.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="caption-edit">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter caption"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a caption.
                </Form.Control.Feedback>
              </Form.Group>
            </Container>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
