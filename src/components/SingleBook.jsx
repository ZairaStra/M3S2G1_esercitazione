/*
import fantasy from "../data/fantasy.json";
import history from "../data/history.json";
import horror from "../data/horror.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";
import { Component } from "react";
*/

import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleBook extends Component {
  render() {
    const { book, isCardSelected, cardToggle } = this.props;

    return (
      <>
        {/*     {this.state.showAlert && (
          <Alert variant="danger" onClose={this.closeAlert} dismissible>
            Feedback sent!
          </Alert>
        )} */}

        <Card className={`singleCard ${isCardSelected ? "bg-danger-subtle shadow-danger rounded" : ""} `}>
          <Card.Img className="singleCardImg" variant="top" src={book.img} onClick={cardToggle} style={{ cursor: "pointer" }} />
          <Card.Body className="text-center">
            <Card.Title className="singleCardTitle overflow-hidden text-danger-emphasis">{book.title}</Card.Title>
            {/*   {isCardSelected && <CommentArea asin={book.asin} onCommentAdded={onCommentAdded} />} */}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SingleBook;

/* const SingleBook = function (props) {
  return (
    <Card className="singleCard">
      <Card.Img className="singleCardImg" variant="top" src={props.book.img} />
      <Card.Body className="text-center">
        <Card.Title className="singleCardTitle overflow-hidden">{props.book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
 */
