import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import ModalForm from "./ModalForm";

const Meme = (props) => {
  const { meme } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <Card border="success" className="my-3 rounded card border-success">
      <Card.Header lg={3}>
        <Row className="align-items-center">
          <Col xs={8} sm={9} md={9} lg={10}>
            <Card.Title>
              <h6>
                <strong>{meme.name}</strong>
              </h6>
            </Card.Title>
            <Card.Subtitle as="div" className="text-muted">
              <p>{meme.caption}</p>
            </Card.Subtitle>
          </Col>
          <Col className="m-auto align-items-center">
            <Button className="m-auto" onClick={handleShow}>
              <i className="fas fa-edit"></i>
            </Button>
            <ModalForm
              handleClose={handleClose}
              show={show}
              memeId={meme._id}
            ></ModalForm>
          </Col>
        </Row>
      </Card.Header>

      <Card.Img src={meme.url} variant="top" />
    </Card>
  );
};

export default Meme;
