import BoxHome from "../components/BoxHome";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getClassesActive } from "../store/actions/actionClasses";
import { useLocation } from "react-router-dom";
import BoxClass from "../components/BoxClass";
import { Grid, Button } from "@mui/material";
import FilterClass from "../components/FilterClass";
function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const { classes } = useSelector((state) => state["classes"]);
  const [showListening, setShowListening] = useState("Listening");
  const [params, setParams] = useState({});

  const handleListening = (payload) => {
    if (payload === "Listening") {
      setShowListening("Hide");
      setParams({ categoryId: 1 });
      dispatch(getClassesActive({ ...params, categoryId: 1 }));
    } else {
      setShowListening("Listening");
      setParams({});
      dispatch(getClassesActive());
    }
  };

  const handleLevelListening = (payload) => {
    console.log(payload);
  };

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
        <Grid item sm={12} style={{ display: "flex" }} xs={12}>
          <Grid item sm={1} xs={4}>
            <Button variant="outlined" color="success" sx={{ maxWidth: "25vmin", minWidth: "25vmin" }} onClick={() => handleListening(showListening)}>
              {showListening === "Hide" ? "Clear Filter" : "Listening"}
            </Button>
          </Grid>
          <Grid item sm={11} xs={8} justify="flex-end">
            {showListening === "Listening" ? "" : <FilterClass handleClick={handleLevelListening} />}
          </Grid>
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
