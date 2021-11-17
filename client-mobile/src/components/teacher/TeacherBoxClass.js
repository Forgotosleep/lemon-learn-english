import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { brown } from "@mui/material/colors";
import { Badge, Button as ButBos } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateStatusClass } from "../../store/actions/actionClasses";
import { alertSure } from "../../assets/js/sweetalert2";
import { useNavigate } from "react-router-dom";
function TeacherBoxClass(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = props;

  const hideClass = async (payload) => {
    let body = {
      id: payload,
    };
    if (data["status"] === "active") {
      body["status"] = "inactive";
    } else {
      body["status"] = "active";
    }
    const result = await alertSure();
    if (result.value) {
      dispatch(updateStatusClass(body));
    }
  };
  return (
    <>
      <Card sx={{ display: "flex", mt: 1, mb: 1, color: brown[400], width: "50vh" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              fontSize={{
                md: 25,
                xs: 25,
              }}
            >
              {data.name}
            </Typography>
            <Typography
              fontSize={{
                md: 15,
                xs: 15,
              }}
            >
              <Badge bg={data.Category.name === "listening" ? "warning" : "info"}>{data.Category.name}</Badge>
              <Badge
                style={{
                  marginLeft: "0.4rem",
                }}
                bg={data.Level.name === "beginner" ? "secondary" : data.Level.name === "medium" ? "danger" : "primary"}
              >
                {data.Level.name}
              </Badge>
            </Typography>

            <Typography
              fontSize={{
                md: 20,
                xs: 20,
              }}
              color={data.status === "active" ? "green" : "text.secondary"}
            >
              {data.status}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <ButBos onClick={() => navigate("/myclass/" + data.id, { state: { category: data.Category.name, tasks: data.Tasks } })} variant="outline-danger">
              Students
            </ButBos>
            <ButBos
              style={{ marginLeft: "1vh" }}
              onClick={() => {
                hideClass(data.id);
              }}
              variant={data.status === "active" ? "outline-secondary" : "outline-success"}
            >
              {data.status === "active" ? "hide" : "active"}
            </ButBos>
            <ButBos style={{ marginLeft: "1vh" }} variant="outline-info" onClick={() => navigate("/tasks", { state: { category: data.Category.name, tasks: data.Tasks, classId: data.id } })}>
              Tasks
            </ButBos>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default TeacherBoxClass;
