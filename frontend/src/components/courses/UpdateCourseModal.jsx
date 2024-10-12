import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const UpdateCourseModal = () => {
  // Contexts
  const {
    courseState: { course },
    showUpdateCourseModal,
    setShowUpdateCourseModal,
    updateCourse,
    setShowToast,
  } = useContext(CourseContext);

  // State
  const [updatedCourse, setUpdatedCourse] = useState(course);

  useEffect(() => setUpdatedCourse(course), [course]);

  const { title, description, url, status } = updatedCourse;

  const onChangeUpdatedCourseForm = (event) =>
    setUpdatedCourse({
      ...updatedCourse,
      [event.target.name]: event.target.value,
    });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCourse(updatedCourse);
    closeDialog();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const closeDialog = () => {
    setUpdatedCourse(course);
    setShowUpdateCourseModal(false);
  };

  return (
    <Modal show={showUpdateCourseModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making proress?</Modal.Title>
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
              onChange={onChangeUpdatedCourseForm}
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
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedCourseForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              value={status}
              name="status"
              onChange={onChangeUpdatedCourseForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
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

export default UpdateCourseModal;
