import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import CommentList from "./CommentList";
import AddComment from "./AddComments";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZTQ0MzFlYmU4MjAwMTUwOWYzMGMiLCJpYXQiOjE3NDczMTM3MzEsImV4cCI6MTc0ODUyMzMzMX0.sOUGPFm9rwM0pYvE3wqyxXhkj2MG6LblP4jVZPpikrI";

//ricorda SEMPRE  di passarti l eprop come argomento!!!!
const CommentArea = ({ asin, onCommentAdded }) => {
  /*  state = {
    comments: [],
    loading: false,
    hasError: false,
    errorMessage: "",
  }; */
  console.log("🔍 ASIN ricevuto in CommentArea:", asin);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchComments = async () => {
    //this.setState({ loading: true, hasError: false });
    if (!asin) {
      return;
    }
    setLoading(true);
    setHasError(false);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/` + asin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const comments = await response.json();
        setComments(comments);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true), setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  //in questo caso non è necessario fare il componentdidmount perchè prima di selezionare un libro e avere un asin non ho bisogno di una comment area
  /* componentDidMount() {
    this.fetchComments();
  } */

  /* componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
    }
  } 
    const { comments, hasError, errorMessage, loading } = this.state;
  */

  //trasformo in useEffect
  useEffect(() => {
    if (asin) {
      fetchComments();
    }
  }, [asin]);

  return (
    <Container>
      <h5 className="mb-3 text-danger-emphasis d-inline-block">Comment Area</h5>
      {loading && <Spinner animation="border" variant="danger" />}
      {hasError && <Alert variant="danger">{errorMessage}</Alert>}

      {!loading && !hasError && asin ? (
        <>
          <CommentList comments={comments} />
          <AddComment asin={asin} fetchComments={fetchComments} onCommentAdded={onCommentAdded} />
        </>
      ) : (
        !loading && !hasError && <p className="text-center text-muted mt-5">Click on a book to view comments and leave us your review!</p>
      )}
    </Container>
  );
};

export default CommentArea;
