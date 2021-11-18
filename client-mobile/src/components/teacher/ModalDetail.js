import { Badge, Button, Col, Modal, Row, ListGroup } from "react-bootstrap";
import { useState } from "react";

function ModalDetail(props) {
  const { task, category } = props;
  const [show, setShow] = useState(false);
  let song = {};

  if (category === "listening") {
    song = JSON.parse(task.question);
  }

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <ListGroup.Item as="li" action onClick={handleShow} className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{task.name}</div>
          {task.description}
        </div>
      </ListGroup.Item>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {category === "listening" ? (
            <p>
              {song.song.splitLyrics.map((el, idx) => (
                <>{song.index.includes(idx) ? <b style={{ color: "lightseagreen" }}>{el} </b> : el + " "}</>
              ))}
            </p>
          ) : (
            task.question
          )}
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

export default ModalDetail;
