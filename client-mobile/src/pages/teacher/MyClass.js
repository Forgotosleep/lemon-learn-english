import { brown } from "@mui/material/colors";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyStudents } from "../../store/actions/actionClasses";
import { Col, Row } from "react-bootstrap";
import CardStudent from "../../components/teacher/CardStudent";

function MyClass() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const { myStudents } = useSelector((state) => state["classes"]);
  useEffect(() => {
    dispatch(getMyStudents(id));
  }, []);

  return (
    <>
      <div className="container mb-5 ">
        <h1
          style={{
            color: brown[400],
          }}
        >
          My Student
        </h1>
        <Row xs={1} md={3} className="mt-5 g-3 ">
          {myStudents.result?.map((el) => (
            <Col key={el.id}>
              <CardStudent data={el} state={state} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default MyClass;
