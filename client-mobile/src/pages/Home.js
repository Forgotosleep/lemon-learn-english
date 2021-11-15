import BoxHome from "../components/BoxHome";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getClassesActive } from "../store/actions/actionClasses";
import { useLocation } from "react-router-dom";
import BoxClass from "../components/BoxClass";
import { Grid } from "@mui/material";
function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const { classes } = useSelector((state) => state["classes"]);

  useEffect(() => {
    setPath(location.pathname);
    if (path === "/") {
      dispatch(getClassesActive());
    }
  }, [path]);

  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item sm={12} xs={12}>
          <BoxHome />
        </Grid>
        {classes.result?.map((el) => (
          <Grid key={el.id} item style={{ display: "flex" }} item sm={4} xs={12}>
            <BoxClass data={el} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
