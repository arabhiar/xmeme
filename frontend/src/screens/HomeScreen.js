import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Meme from "../components/Meme";
import MemeForm from "../components/MemeForm";
import { listMemes } from "../actions/memeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  // const [render, setRender] = useState(false);

  const memeList = useSelector((state) => state.memeList);
  const { loading, error, memes } = memeList;

  useEffect(() => {
    dispatch(listMemes());
  }, [dispatch]);

  // const renderHomeScreen = () => {
  //   setRender(!render);
  // };

  return (
    <>
      <MemeForm />
      <Container>
        <h1 className="mt-3"> Latest Memes</h1>
      </Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        memes.map((meme) => (
          <Col key={meme._id} sm={10} md={8} lg={6} className="mb-5">
            <Meme meme={meme} />
          </Col>
        ))
      )}
    </>
  );
};

export default HomeScreen;
