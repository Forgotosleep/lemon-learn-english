import BoxHome from "../components/BoxHome";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getClassesActive } from "../store/actions/actionClasses";
import BoxClass from "../components/BoxClass";
import { Grid } from "@mui/material";
function Home() {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state["classes"]);
  const { isLoggedIn, isLoading } = useSelector((state) => state["user"]);
  console.log(isLoggedIn)
  useEffect(() => {
    dispatch(getClassesActive())
  }, [isLoggedIn])

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
