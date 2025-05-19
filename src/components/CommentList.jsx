import { Component } from "react";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";

class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <ListGroup>
        {comments.lenght === 0 && <p className="text-muted">We haven't comments for this book</p>}
        {comments.map((comment) => (
          <ListGroupItem key={comment._id}>
            {comment.comment} <Badge className="bg-danger">{comment.rate}</Badge>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default CommentList;
