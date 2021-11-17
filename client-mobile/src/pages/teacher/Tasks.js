import { brown } from "@mui/material/colors";
import { ListGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import ModalAddTask from "../../components/teacher/ModalAddTasks";

function Tasks() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const goToSearchSong = () => {
    navigate("/search-song", { state: { category: state.category, classId: state.classId } });
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
            <ListGroup.Item key={el.id} as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{el.name}</div>
                {el.description}
              </div>
              <Button variant="outline-danger">Hide</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Tasks;
