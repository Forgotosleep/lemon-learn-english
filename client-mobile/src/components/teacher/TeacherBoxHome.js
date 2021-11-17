import { Grid, Box } from "@mui/material";
import { brown } from "@mui/material/colors";
import { useSelector } from "react-redux";
function TeacherBoxHome() {
  const { user } = useSelector((state) => state["user"]);
  return (
    <>
      <Box bgcolor="white" sx={{ flexGrow: 1, borderRadius: "10px", color: brown[700] }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <p
              style={{
                marginLeft: 20,
              }}
            >
              Hello , {user["name"]}, {user["role"]}
              <br />
              Are you ready to teach some students?
            </p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default TeacherBoxHome;
