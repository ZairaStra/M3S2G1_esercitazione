import { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZTQ0MzFlYmU4MjAwMTUwOWYzMGMiLCJpYXQiOjE3NDczMTM3MzEsImV4cCI6MTc0ODUyMzMzMX0.sOUGPFm9rwM0pYvE3wqyxXhkj2MG6LblP4jVZPpikrI";

class AddComment extends Component {
  state = {
    comment: "",
    rate: 1,
    elementId: this.props.asin,
    success: false,
    hasError: false,
  };

  resetForm = () => {
    this.setState({
      comment: "",
      rate: 1,
      success: false,
      hasError: false,
      errorMessage: "",
    });
  };

  /*  componentDidMount() {
    this.setState(() => ({}));
  }
 */
  onSubmit = async (e) => {
    e.preventDefault();

    const { comment, rate, elementId } = this.state;

    const data = {
      comment,
      rate,
      elementId,
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
        this.setState({
          comment: "",
          rate: 1,
          success: true,
          hasError: false,
        });

        setTimeout(() => {
          this.setState({ success: false });
        }, 3000);

        if (this.props.onCommentAdded) {
          this.props.onCommentAdded();
        }
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <h6 className="text-danger-emphasis">Add a comment!</h6>
        <Form.Group className="my-2" controlId="formText">
          <Form.Label className="text-danger-emphasis">Your review</Form.Label>
          <Form.Control
            className="text-center"
            type="text"
            placeholder="Write here"
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="formRange">
          <Form.Label>Your Rate</Form.Label>
          <Form.Select aria-label="formRange" value={this.state.rate} onChange={(e) => this.setState({ rate: e.target.value })}>
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
        {this.state.success && (
          <Alert variant="success" className="mt-3">
            Comment sent!
          </Alert>
        )}
        {this.state.hasError && (
          <Alert variant="danger" className="mt-3">
            {this.state.errorMessage || "Error, please try again"}
          </Alert>
        )}
      </Form>
    );
  }
}

export default AddComment;
