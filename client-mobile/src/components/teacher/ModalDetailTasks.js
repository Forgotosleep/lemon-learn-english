import { Button, ListGroup, Modal } from "react-bootstrap";
import { useState } from "react";
import List from "./List";

function ModalDetailTasks(props) {
  const { tasks } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const afterUpdate = (value) => {
    setShow(false);
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
          <ListGroup as="ol" numbered>
            {tasks.map((el) => (
              <List key={el.id} afterUpdate={afterUpdate} data={el} />
            ))}
          </ListGroup>
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
