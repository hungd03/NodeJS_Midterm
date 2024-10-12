import { CourseContext } from "../contexts/CourseContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import SingleCourse from "../components/courses/SingleCourse";
import AddCourseModal from "../components/courses/AddCourseModal";
import UpdateCourseModal from "../components/courses/UpdateCourseModal";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    courseState: { course, courses, coursesLoading },
    getCourses,
    setShowAddCourseModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CourseContext);

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body = null;

  if (coursesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (courses.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Courses</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddCourseModal.bind(this, true)}
            >
              New Skill
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {courses.map((course) => (
            <Col key={course._id} className="my-2">
              <SingleCourse course={course} />
            </Col>
          ))}
        </Row>

        {/* Open Add Course Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddCourseModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-course" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddCourseModal />
      {course !== null && <UpdateCourseModal />}
      {/* Show toast when added course successfully */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px", width: "13%" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
