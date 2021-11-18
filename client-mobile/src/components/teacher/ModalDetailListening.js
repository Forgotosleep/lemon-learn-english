import { Button, Dropdown, Modal, Badge } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { alertError, alertSure } from "../../assets/js/sweetalert2";
import { updateScore } from "../../store/actions/actionClasses";
function ModalDetailListening(props) {
  const dispatch = useDispatch();
  const { tasks } = props;
  const [score, setScore] = useState(tasks.score);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setScore(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };

  let question = JSON.parse(tasks.Task.question);
  let answer = JSON.parse(tasks.answer);
  let temp = {
    trueAnswer: [],
    studentAnswer: [],
  };
  question.index.forEach((i1, i2) => {
    const trueAnswers = question.song.splitLyrics[i1]?.split(" ") || "";
    const studentAnswers = answer[i2]?.split(" ") || "";
    temp.trueAnswer.push(trueAnswers);
    temp.studentAnswer.push(studentAnswers);
  });
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleClick = async () => {
    const result = await alertSure();
    const payload = {
      id: tasks.id,
      score: score,
      classId: tasks.Task.classId,
    };
    if (result.value) {
      if (score > 100) {
        alertError("max score is 100");
      } else if (score < 0) {
        alertError("min score is 0");
      } else {
        dispatch(updateScore(payload));
        setShow(false);
      }
    }
  };
  return (
    <>
      <Dropdown.Item onClick={handleShow} href="#/action-1">
        {tasks.Task.name}
      </Dropdown.Item>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="mb-3">
            <b style={{ color: "red" }}>red = student answer</b>
          </h3>
          <div className="form-group mb-4">
            <label>Student Score</label>
            <input onChange={handleChange} value={score} type="number" className="form-control" />
          </div>
          {temp.trueAnswer.map((el, idx) => (
            <>
              <pre>{el + " "} </pre>
              <pre style={{ color: "red" }}>
                <b>{temp.studentAnswer[idx] ? temp.studentAnswer[idx] + " " : "Not Answer"}</b>
              </pre>
            </>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClick}>
            Save Edit
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetailListening;
