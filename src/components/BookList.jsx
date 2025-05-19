import { Component } from "react";
import SingleBook from "./SingleBook";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    showBooks: false,
    selectedBook: null,
    showAlert: false,
  };

  /*   cardToggle = () => {
    this.setState((prevState) => ({ isCardSelected: !prevState.isCardSelected }));
  }; */

  cardToggle = (asin) =>
    this.setState((prevState) => ({
      selectedBook: prevState.selectedBook === asin ? null : asin,
    }));

  commentAdded = () => {
    this.setState({ selectedBook: null, showAlert: true });
  };

  render() {
    const { books } = this.props;
    const { searchQuery, showBooks, selectedBook } = this.state;

    return (
      <Container fluid>
        <div className="mb-3">
          {this.state.showAlert && (
            <Alert variant="success" onClose={() => this.setState({ showAlert: false })} dismissible>
              Feedback sent!
            </Alert>
          )}
          <h3 className="my-4 font-monospace text-center text-danger-emphasis">
            {books.length > 0 ? `Search by name in: ${books[0].category.toUpperCase()}` : "Search by name"}
          </h3>
          {/* <h3 className="my-4 font-monospace text-center">Search by name in the category: {this.props.books[0].category}</h3> */}
          <Row className="my-3 justify-content-center">
            <Col className="col-12 col-md-10">
              <Row className="justify-content-center gx-4 gy-4 mb-5">
                <Col className="col-11">
                  <Form.Control
                    type="text"
                    placeholder="Search your next book!"
                    value={searchQuery}
                    onChange={(e) => this.setState({ searchQuery: e.target.value, showBooks: e.target.value.length > 0 })}
                    aria-label="Search your book"
                    aria-describedby="Search"
                  />
                </Col>
                <Col className="col-1 d-flex justify-content-end">
                  <Button className="singleButton align-items-baseline" variant="danger" onClick={() => this.setState({ showBooks: !showBooks })}>
                    {showBooks ? (
                      <>
                        <i className="bi bi-chevron-up"> </i>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-chevron-down"></i>
                      </>
                    )}
                  </Button>
                </Col>
              </Row>{" "}
            </Col>
          </Row>
          {showBooks && (
            <>
              <Row className="gy-4">
                <Col xs={12} sm={7} md={8} className="scrollable-col">
                  <Row xs={1} sm={2} md={3} className="gy-4">
                    {this.props.books
                      .filter((book) => book.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                      .map((book) => (
                        <Col key={book.asin}>
                          <SingleBook
                            book={book}
                            isCardSelected={selectedBook === book.asin}
                            cardToggle={() => this.cardToggle(book.asin)}
                            onCommentAdded={this.commentAdded}
                          />
                        </Col>
                      ))}
                  </Row>
                </Col>

                <Col xs={12} sm={5} md={4} className="fixed-col">
                  {selectedBook ? (
                    <CommentArea asin={selectedBook} onCommentAdded={this.commentAdded} />
                  ) : (
                    <p className="text-center text-muted mt-5">Click on a book to view comments and leave us your review!</p>
                  )}
                </Col>
              </Row>
            </>
          )}
        </div>
      </Container>
    );
  }
}

export default BookList;
