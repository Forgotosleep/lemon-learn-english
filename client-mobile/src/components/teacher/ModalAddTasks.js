import { Button, Modal, Toast } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/actions/actionClasses";
import { alertSure } from "../../assets/js/sweetalert2";
import { useNavigate } from "react-router";

function ModalAddTask(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classId } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [validate, setValidate] = useState({
    name: false,
    description: false,
    question: false,
  });
  const handleClose = () => {
    setShow(false);
    setData({ classId: classId });
    setValidate({});
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setValidate({ ...validate, [e.target.name]: true });
    }
    setData({ ...data, [e.target.name]: value });
  };
  const handleShow = () => {
    setShow(true);
    setData({ classId: classId });
    setValidate({});
  };

  const toast = (show) => {
    return (
      <Toast className="mb-1" bg="danger" show={show}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">required</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
      </Toast>
    );
  };

  const handleSubmit = async (e) => {
    if (!data["name"]) {
      setValidate({ name: true });
    } else if (!data["description"]) {
      setValidate({ description: true });
    } else if (!data["question"]) {
      setValidate({ question: true });
    } else {
      setShow(false);
      setValidate({});
      const result = await alertSure();

      if (result.value) {
        dispatch(addTask(data));
        navigate("/");
      }
    }
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Add Task
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label className="mb-2">Task Name</label>
              {validate.name ? toast(validate.name) : ""}

              <input className="form-control" onChange={handleChange} name="name" />
              <label className="mb-2">Task Description</label>
              {validate.description ? toast(validate.description) : ""}
              <textarea className="form-control" onChange={handleChange} name="description"></textarea>
              <label className="mb-2">Task Question</label>
              {validate.question ? toast(validate.question) : ""}
              <textarea className="form-control" onChange={handleChange} name="question"></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddTask;
