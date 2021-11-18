import { brown } from "@mui/material/colors";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMyStudents } from "../../store/actions/actionClasses";
import { Col, Row, Form } from "react-bootstrap";
import CardStudent from "../../components/teacher/CardStudent";
import { Grid, Stack, Pagination } from "@mui/material";

function MyClass() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const { myStudents } = useSelector((state) => state["classes"]);
  const [params, setParams] = useState({});
  useEffect(() => {
    dispatch(getMyStudents({ id: id }));
  }, []);

  const handleFilter = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "1") {
      dispatch(getMyStudents({ id: id, status: e.target.value }));
      setParams({
        status: e.target.value,
      });
    } else {
      dispatch(getMyStudents({ id: id }));
    }
  };
  const handlePage = (e, value) => {
    dispatch(getMyStudents({ id: id, ...params, page: value }));
  };

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
        <Form.Select onChange={handleFilter} className="mt-3" aria-label="Default select example">
          <option selected value="1">
            -- All --
          </option>
          <option value="complete">complete</option>
          <option value="incomplete">incomplete</option>
        </Form.Select>
        <Row xs={1} md={3} className="mt-3 g-3 ">
          {myStudents.result?.map((el) => (
            <Col key={el.id}>
              <CardStudent data={el} state={state} />
            </Col>
          ))}
        </Row>
        <Grid item sm={12} xs={12} sx={{ mb: 2, mt: 3 }}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Pagination hidePrevButton hideNextButton onChange={handlePage} count={myStudents.totalPages} color="warning" />
          </Stack>
        </Grid>
      </div>
    </>
  );
}

export default MyClass;
