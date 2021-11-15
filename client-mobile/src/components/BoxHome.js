import "../assets/css/App.css";
import { Grid, Box } from "@mui/material";
import pikachugif from "../assets/image/pikachugif.gif";
import { brown } from "@mui/material/colors";
import { useSelector } from "react-redux";
function BoxHome() {
  const { user } = useSelector((state) => state["user"]);
  return (
    <>
      <Box bgcolor="white" sx={{ flexGrow: 1, borderRadius: "10px", color: brown[700] }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <p
              style={{
                marginLeft: 20,
              }}
            >
              Hello , {user["name"]}
              <br />
              are you ready to join a class ?
            </p>
          </Grid>
          <Grid item xs={6}>
            <img src={pikachugif} className="my-photo" alt="pikachugif" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BoxHome;
