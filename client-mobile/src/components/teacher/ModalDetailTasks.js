import { Badge, Button, Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";

function ModalDetailTasks(props) {
  const { tasks } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

    console.log(tasks)
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
