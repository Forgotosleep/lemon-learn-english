import { Badge, Button, Col, Container, Modal, Row, Toast } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addClass } from "../../store/actions/actionClasses";
import { alertSure } from "../../assets/js/sweetalert2";

function ModalDetailTasks(props) {
  const dispatch = useDispatch();
  const { tasks } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [validate, setValidate] = useState({
    name: false,
    levelId: false,
    categoryId: false,
  });
  const handleClose = () => {
    setShow(false);
    setData({});
    setValidate({ name: false, levelId: false, categoryId: false });
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
    setData({});
    setValidate({ name: false, levelId: false, categoryId: false });
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
    } else if (!data["levelId"]) {
      setValidate({ levelId: true });
    } else if (!data["categoryId"]) {
      setValidate({ categoryId: true });
    } else {
      setShow(false);
      setValidate({ name: false, levelId: false, categoryId: false });
      const result = await alertSure();

      if (result.value) {
        dispatch(addClass(data));
      }
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-info">
        Detail Tasks
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {tasks.map((el, idx) => (
              <>
                <Col md={1} xm={1} className="mt-">
                  <label>{idx + 1}. </label>
                </Col>
                <Col md={6} xm={6}>
                  <label>{el.Task.question} </label>
                </Col>
                <Col md={5} xm={5}>
                  <label>
                    score : <Badge bg="secondary">{el.score}</Badge>{" "}
                  </label>
                </Col>

                <Col md={12} xm={12} className="mt-1">
                  <div align="center">
                    <audio controls>
                      <source src={el.soundUrl} type="audio/wav" />
                    </audio>
                  </div>
                </Col>
              </>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetailTasks;
