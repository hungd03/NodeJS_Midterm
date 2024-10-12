import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const AddCourseModal = () => {
  // Contexts
  const { showAddCourseModal, setShowAddCourseModal, addCourse, setShowToast } =
    useContext(CourseContext);

  // State
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newCourse;

  const onChangeNewCourseForm = (event) =>
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCourse(newCourse);
    resetAddCourseData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddCourseData = () => {
    setNewCourse({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddCourseModal(false);
  };

  return (
    <Modal show={showAddCourseModal} onHide={resetAddCourseData}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewCourseForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetAddCourseData}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCourseModal;
