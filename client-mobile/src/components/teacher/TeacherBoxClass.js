import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { brown } from "@mui/material/colors";
import { Button as ButBos } from "react-bootstrap";
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
                md: 20,
                xs: 15,
              }}
            >
              {data.name} ({data.Category.name})
            </Typography>
            <Typography
              fontSize={{
                md: 15,
                xs: 15,
              }}
              color="text.secondary"
            >
              {data.Level.name}
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
            <ButBos onClick={() => navigate("/myclass/" + data.id)} variant="outline-danger">
              Check your class !
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
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default TeacherBoxClass;
