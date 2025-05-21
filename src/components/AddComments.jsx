import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZTQ0MzFlYmU4MjAwMTUwOWYzMGMiLCJpYXQiOjE3NDczMTM3MzEsImV4cCI6MTc0ODUyMzMzMX0.sOUGPFm9rwM0pYvE3wqyxXhkj2MG6LblP4jVZPpikrI";

const AddComment = ({ asin, fetchComments, onCommentAdded }) => {
  /*  state = {
    comment: "",
    rate: 1,
    elementId: this.props.asin,
    success: false,
    hasError: false,
  }; */
  console.log("🟦 asin ricevuto come prop:", asin);
  const [formData, setFormData] = useState({
    comment: "",
    rate: 1,
  });
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData({
      comment: "",
      rate: 1,
    });
    setSuccess(false);
    setHasError(false);
    setErrorMessage("");
  }, [asin]);

  /*  componentDidMount() {
    this.setState(() => ({}));
  }
 */
  const sendComment = async (e) => {
    e.preventDefault();

    const data = {
      comment: formData.comment,
      rate: formData.rate,
      elementId: asin,
    };

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormData({ comment: "", rate: 1 });
        setSuccess(true);
        setHasError(false);
        fetchComments(); // aggiorna la lista commenti
        onCommentAdded && onCommentAdded();
      } else {
        setHasError(true);
        setSuccess(false);
        setErrorMessage("Failed to submit review");
      }
    } catch (error) {
      setHasError(true);
      setSuccess(false);
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  return (
    <Form onSubmit={sendComment}>
      <h6 className="text-danger-emphasis mt-3">Add a comment!</h6>
      <Form.Group className="my-2" controlId="formText">
        <Form.Label className="text-danger-emphasis">Your review</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          placeholder="Write here"
          value={formData.comment}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              comment: e.target.value,
            }))
          }
          required
        />
      </Form.Group>
      <Form.Group className="my-2" controlId="formRange">
        <Form.Label>Your Rate</Form.Label>
        <Form.Select aria-label="formRange" value={formData.rate} onChange={(e) => setFormData((prev) => ({ ...prev, rate: e.target.value }))}>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </Form.Select>
      </Form.Group>
      <Button className="singleCardButton" variant="danger" type="submit">
        Submit
      </Button>
      {success && (
        <Alert variant="success" className="mt-3">
          Comment sent!
        </Alert>
      )}
      {hasError && (
        <Alert variant="danger" className="mt-3">
          {errorMessage || "Error, please try again"}
        </Alert>
      )}
    </Form>
  );
};

export default AddComment;
