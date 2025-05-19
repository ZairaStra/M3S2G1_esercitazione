import { Col, Container, Row, Alert } from "react-bootstrap";

const Welcome = function () {
  return (
    <Container>
      <Row className="my-5 justify-content-center">
        <Col className="col-12 col-md-10">
          <div className="d-flex justify-content-center align-items-baseline gap-3">
            <h1 className="font-monospace display-1 mb-4 text-danger-emphasis">EpiBooks</h1>
            <p className="font-monospace">Your Epic Bookstore!</p>
          </div>
          <Alert variant="danger" className="text-center">
            This web page is under maintenance
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
