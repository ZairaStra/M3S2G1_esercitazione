import { Component } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import CommentList from "./CommentList";
import AddComment from "./AddComments";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZTQ0MzFlYmU4MjAwMTUwOWYzMGMiLCJpYXQiOjE3NDczMTM3MzEsImV4cCI6MTc0ODUyMzMzMX0.sOUGPFm9rwM0pYvE3wqyxXhkj2MG6LblP4jVZPpikrI";

class CommentArea extends Component {
  state = {
    comments: [],
    loading: false,
    hasError: false,
    errorMessage: "",
  };

  fetchComments = async () => {
    this.setState({ loading: true, hasError: false });

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const comments = await response.json();
        this.setState({ comments });
      } else {
        throw new Error("Error loading comments");
      }
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  //in questo caso non è necessario fare il componentdidmount perchè prima di selezionare un libro e avere un asin non ho bisogno di una comment area
  /* componentDidMount() {
    this.fetchComments();
  } */

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
    }
  }

  render() {
    const { comments, hasError, errorMessage, loading } = this.state;

    return (
      <Container>
        <h5 className="mb-3 text-danger-emphasis d-inline-block">Comment Area</h5>
        {loading && <Spinner animation="border" variant="danger" />}
        {hasError && <Alert variant="danger">{errorMessage}</Alert>}

        {!loading &&
          !hasError &&
          (this.props.asin ? (
            <>
              <CommentList comments={comments} />
              <AddComment asin={this.props.asin} onCommentAdded={this.handleCommentAdded} fetchComments={this.fetchComments} />
            </>
          ) : (
            <p className="text-center text-muted mt-5">Click on a book to view comments and leave us your review!</p>
          ))}
      </Container>
    );
  }
}

export default CommentArea;
