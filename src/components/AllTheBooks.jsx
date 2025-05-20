import { Col, Container, Row, Card, Button } from "react-bootstrap";
import fantasy from "../data/fantasy.json";
import history from "../data/history.json";
import horror from "../data/horror.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";
import { useState } from "react";
const AllTheBooks = () => {
  /*  state = {
    collection: [],
  }; */

  const [collection, setCollection] = useState([]);

  return (
    <Container>
      <div className="text-center mb-5">
        <h3 className="my-3 font-monospace text-danger-emphasis">Browse by genre</h3>
        <Row className="my-3 justify-content-center">
          <Col className="col-12 col-sm-10 col-lg-8">
            <Row className="gx-0 gy-4">
              <Col>
                <Button className="singleCardButton" variant="success" onClick={() => setCollection(scifi)}>
                  SCIFI
                </Button>
              </Col>
              <Col>
                <Button className="singleCardButton" variant="warning text-white" onClick={() => setCollection(history)}>
                  HISTORY
                </Button>
              </Col>
              <Col>
                <Button className="singleCardButton" variant="danger" onClick={() => setCollection(romance)}>
                  ROMANCE
                </Button>
              </Col>
              <Col>
                <Button className="singleCardButton" variant="primary" onClick={() => setCollection(fantasy)}>
                  FANTASY
                </Button>
              </Col>
              <Col>
                {/* <Button className="singleCardButton" variant="dark text-white" onClick={() => setCollection({ collection: horror })}>HORROR </Button>*/}
                <Button className="singleCardButton" variant="dark text-white" onClick={() => setCollection(horror)}>
                  HORROR
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} xxl={6} className="justify-content-center gy-4 mb-5">
        {collection.map((book) => (
          <Col key={book.asin}>
            <Card className="singleCard">
              <Card.Img className="singleCardImg" variant="top" src={book.img} />
              <Card.Body className="text-center">
                <Card.Title className="singleCardTitle text-truncate text-danger-emphasis">{book.title}</Card.Title>
                <Card.Text className="singleCardText text-capitalize text-danger-emphasis">{book.category}</Card.Text>
                <Button className="singleCardButton" variant="danger">
                  <i className="bi bi-basket"></i> <span>{book.price} €</span>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllTheBooks;
