import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";

//le prop vanno messe in graffe
const CommentList = ({ comments }) => {
  if (!Array.isArray(comments) || !comments || comments.length === 0) {
    return <p className="text-muted">We haven't comments for this book</p>;
  }

  return (
    <ListGroup>
      {comments.map((comment) => (
        <ListGroupItem key={comment._id}>
          {comment.comment} <Badge className="bg-danger">{comment.rate}</Badge>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CommentList;
