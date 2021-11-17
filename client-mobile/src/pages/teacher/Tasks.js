import { brown } from "@mui/material/colors";
import { ListGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import ModalAddTask from "../../components/teacher/ModalAddTasks";
import ModalDetail from "../../components/teacher/ModalDetail";
import { useState, useEffect } from "react";
function Tasks() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const goToSearchSong = () => {
    navigate("/search-song", { state: { category: state.category, classId: state.classId } });
  };

  useEffect(() => {}, [show]);

  const handleShow = (el) => {
    setShow(true);
  };
  const handleClose = (el) => {
    console.log(el);
    setShow(false);
  };

  return (
    <>
      <div className="container mb-5 ">
        <h1
          style={{
            color: brown[400],
            marginBottom: "2rem",
          }}
        >
          List Tasks
        </h1>
        {state.category === "speaking" ? (
          <ModalAddTask classId={state.classId} />
        ) : (
          <Button onClick={goToSearchSong} variant="outline-success">
            Add Task
          </Button>
        )}

        <ListGroup as="ol" className="mt-3" numbered>
          {state.tasks.map((el) => (
            <ModalDetail key={el.id} category={state.category} task={el} />
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Tasks;
