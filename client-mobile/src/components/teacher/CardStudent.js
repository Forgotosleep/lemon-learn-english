import { brown } from "@mui/material/colors";
import { Col, Row, Image, Card, Badge, Dropdown } from "react-bootstrap";
import ModalDetailListening from "./ModalDetailListening";
import ModalDetailTasks from "./ModalDetailTasks";
function CardStudent(props) {
  const { data, state } = props;
  const sumScore = (int) => {
    let temp = 0;
    if (data.student.Scores.length === 0) return temp;
    for (const key in data.student.Scores) {
      temp += data.student.Scores[key]["score"];
    }

    return temp / int.toFixed(2);
  };
  return (
    <>
      <div className="card  d-flex flex-fill" style={{ borderRadius: "15px", color: brown[400] }}>
        <div className="card-body">
          <Row>
            <Col md={5} xs={5}>
              <Image width={"101vh"} height={"101vh"} src={data.student.photo} roundedCircle />
            </Col>
            <Col md={7} xs={7}>
              <Row>
                <Col md={12} xs={12}>
                  <Card.Title>{data.student.name}</Card.Title>
                </Col>
                <Col md={12} xs={12}>
                  <Badge className="mb-2" bg={data.status === "complete" ? "success" : "warning"}>
                    {data.status}
                  </Badge>
                </Col>
                <Col md={6} xs={6}>
                  <label>Score</label>
                </Col>
                <Col md={6} xs={6}>
                  <Badge bg="secondary">{sumScore(data.student.Scores.length)}</Badge>
                </Col>
                <Col md={6} xs={6}>
                  <label>Task</label>
                </Col>
                <Col md={6} xs={6}>
                  <Badge bg="secondary">
                    {data.student.Scores.length} / {state.tasks.length}{" "}
                  </Badge>
                </Col>
              </Row>
            </Col>
            <Col md={12} xs={12}>
              {state.category === "speaking" ? (
                <div className="d-grid mt-2 gap-2">
                  <ModalDetailTasks tasks={data.student.Scores} />
                </div>
              ) : (
                <Dropdown className="d-grid mt-2 gap-2" id="dropdown-basic">
                  <Dropdown.Toggle variant="outline-success">Detail Task</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {data.student.Scores.map((el) => (
                      <ModalDetailListening key={el.id} tasks={el} />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default CardStudent;
