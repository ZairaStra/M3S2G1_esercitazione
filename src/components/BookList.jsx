import { useState } from "react";
import SingleBook from "./SingleBook";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = ({ books }) => {
  /*  state = {
    searchQuery: "",
    showBooks: false,
    selectedBook: "",
    showAlert: false,
  };
 */
  const [searchQuery, setSearchQuery] = useState("");
  const [showBooks, setShowBooks] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  /*   cardToggle = () => {
    this.setState((prevState) => ({ isCardSelected: !prevState.isCardSelected }));
  }; */

  const cardToggle = (asin) => {
    setSelectedBook((prev) => (prev === asin ? "" : asin));
  };

  const commentAdded = () => {
    setShowAlert(true);
  };

  //const { searchQuery, showBooks, selectedBook } = this.state;

  return (
    <Container fluid>
      <div className="mb-3">
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Feedback sent!
          </Alert>
        )}
        <h3 className="my-4 font-monospace text-center text-danger-emphasis">
          {books.length > 0 ? `Search by name in: ${books[0].category.toUpperCase()}` : "Search by name"}
        </h3>
        {/* sezione barra di ricerca e pulsante mostra carte- non necessaria*/}
        <Row className="my-3 justify-content-center">
          <Col className="col-12 col-md-10">
            <Row className="justify-content-center gx-4 gy-4 mb-5">
              <Col className="col-11">
                <Form.Control
                  type="text"
                  placeholder="Search your next book!"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowBooks(e.target.value.length > 0);
                  }}
                  aria-label="Search your book"
                  aria-describedby="Search"
                />
              </Col>
              <Col className="col-1 d-flex justify-content-end">
                <Button className="singleButton align-items-baseline" variant="danger" onClick={() => setShowBooks(!showBooks)}>
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
            </Row>
          </Col>
        </Row>
        {showBooks && (
          <>
            <Row className="gy-4">
              <Col xs={12} sm={7} md={8} className="scrollable-col">
                <Row xs={1} sm={2} md={3} className="gy-4">
                  {books
                    .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((book) => (
                      <Col key={book.asin}>
                        <SingleBook
                          book={book}
                          //controllo per rendere unico book asin e non accavallarne più di uno
                          isCardSelected={selectedBook === book.asin}
                          //funzione che aggiorna il book.asin a seconda della card cliccata
                          //informazione passata da single book a booklist (dentro-fuori) tramite
                          //state-elevation
                          cardToggle={() => cardToggle(book.asin)}
                          onCommentAdded={commentAdded}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>

              <Col xs={12} sm={5} md={4} className="fixed-col">
                {selectedBook ? (
                  <CommentArea asin={selectedBook} onCommentAdded={commentAdded} />
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
};

export default BookList;
