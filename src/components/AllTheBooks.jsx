import { Col, Container, Row, Card, Button } from "react-bootstrap";
import fantasy from "../data/fantasy.json";
import history from "../data/history.json";
import horror from "../data/horror.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";
import { Component } from "react";
class AllTheBooks extends Component {
  state = {
    collection: [],
  };
  render() {
    return (
      <Container>
        <div className="text-center mb-5">
          <h3 className="my-3 font-monospace text-danger-emphasis">Browse by genre</h3>
          <Row className="my-3 justify-content-center">
            <Col className="col-12 col-sm-10 col-lg-8">
              <Row className="gx-0 gy-4">
                <Col>
                  <Button className="singleCardButton" variant="success" onClick={() => this.setState({ collection: scifi })}>
                    SCIFI
                  </Button>
                </Col>
                <Col>
                  <Button className="singleCardButton" variant="warning text-white" onClick={() => this.setState({ collection: history })}>
                    HISTORY
                  </Button>
                </Col>
                <Col>
                  <Button className="singleCardButton" variant="danger" onClick={() => this.setState({ collection: romance })}>
                    ROMANCE
                  </Button>
                </Col>
                <Col>
                  <Button className="singleCardButton" variant="primary" onClick={() => this.setState({ collection: fantasy })}>
                    FANTASY
                  </Button>
                </Col>
                <Col>
                  <Button className="singleCardButton" variant="dark text-white" onClick={() => this.setState({ collection: horror })}>
                    HORROR
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} xxl={6} className="justify-content-center gy-4 mb-5">
          {this.state.collection.map((book) => (
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
  }
}

export default AllTheBooks;
