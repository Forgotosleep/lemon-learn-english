import { ListGroup, Button, Col } from "react-bootstrap";
import { useState } from "react";
import "../../assets/css/App.css";
import { alertError, alertSure } from "../../assets/js/sweetalert2";
import { useDispatch } from "react-redux";
import { updateScore } from "../../store/actions/actionClasses";

function List(props) {
  const dispatch = useDispatch();
  const { data, afterUpdate } = props;
  const [score, setScore] = useState(data.score);

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  const handleClick = async () => {
    const result = await alertSure();
    const payload = {
      id: data.id,
      score: score,
      classId: data.Task.classId,
    };
    if (result.value) {
      if (score > 100) {
        alertError("max score is 100");
      } else if (score < 0) {
        alertError("min score is 0");
      } else {
        dispatch(updateScore(payload));
        afterUpdate();
      }
    }
  };

  return (
    <>
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <Col xm={3} md={6}>
            <div className="fw-bold">{data.Task.question}</div>
          </Col>
          <audio controls>
            <source src={data.soundUrl} type="audio/wav" />
          </audio>
        </div>
        <div className="ms-1">
          <Col xm={3} md={4}>
            <input type="number" onChange={handleChange} value={score} className="form-control" width="" />
          </Col>
          <Button className="mt-1" onClick={handleClick} variant="primary" pill>
            Save
          </Button>
        </div>
      </ListGroup.Item>
    </>
  );
}

export default List;
