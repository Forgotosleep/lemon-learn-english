import { brown } from "@mui/material/colors";
import { Col, Row, Image, Card, Badge } from "react-bootstrap";
function CardStudent(props) {
  const { data } = props;
  const sumScore = (int) => {
    let temp = 0;
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
                  <p>Score</p>
                </Col>

                <Col md={6} xs={6}>
                  <p>Task</p>
                </Col>
                <Col md={6} xs={6}>
                  <Badge bg="secondary">{sumScore(data.student.Scores.length)}</Badge>
                </Col>
                <Col md={6} xs={6}>
                  <Badge bg="secondary">{data.student.Scores.length}</Badge>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default CardStudent;
