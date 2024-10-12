import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const ActionButtons = ({ url, _id }) => {
  const { deleteCourse, findCourse, setShowUpdateCourseModal } =
    useContext(CourseContext);

  const chooseCourse = (courseId) => {
    findCourse(courseId);
    setShowUpdateCourseModal(true);
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button" onClick={chooseCourse.bind(this, _id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deleteCourse.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="32" height="32" />
      </Button>
    </>
  );
};

export default ActionButtons;
