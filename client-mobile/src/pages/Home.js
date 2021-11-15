import BoxHome from "../components/BoxHome";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getClassesActive } from "../store/actions/actionClasses";
import BoxClass from "../components/BoxClass";
import { Grid, Button, Stack, Pagination } from "@mui/material";
import FilterClass from "../components/FilterClass";
function Home() {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state["classes"]);

  const { isLoggedIn } = useSelector((state) => state["user"]);

  const [showListening, setShowListening] = useState("Listening");
  const [paramsListening, setParamListening] = useState({});
  const [showSpeaking, setShowSpeaking] = useState("Speaking");
  const [paramsSpeaking, setParamSpeaking] = useState({});
  const [params, setParams] = useState({});
  const handleListening = (payload) => {
    if (payload === "Listening") {
      setShowListening("Hide");
      setParamListening({ ...params, ...paramsListening, categoryId: 1 });
      dispatch(getClassesActive({ ...params, ...paramsListening, categoryId: 1 }));
    } else {
      setShowListening("Listening");
      setParamListening({});
      setParams({});
      dispatch(getClassesActive());
    }
  };

  const handleSpeaking = (payload) => {
    if (payload === "Speaking") {
      setShowSpeaking("Hide");
      setParamSpeaking({ ...params, ...paramsSpeaking, categoryId: 2 });
      dispatch(getClassesActive({ ...params, ...paramsSpeaking, categoryId: 2 }));
    } else {
      setShowSpeaking("Speaking");
      setParamSpeaking({});
      setParams({});
      dispatch(getClassesActive());
    }
  };

  const handlePage = (e, value) => {
    setParams({ ...params, ...paramsListening, ...paramsSpeaking, page: value });
    dispatch(getClassesActive({ ...paramsListening, ...paramsSpeaking, page: value }));
  };

  const handleLevelListening = (payload) => {
    setParamListening({ ...params, ...paramsListening, levelId: payload });
    dispatch(getClassesActive({ ...params, ...paramsListening, levelId: payload }));
  };
  const handleLevelSpeaking = (payload) => {
    setParamSpeaking({ ...params, ...paramsSpeaking, levelId: payload });
    dispatch(getClassesActive({ ...params, ...paramsSpeaking, levelId: payload }));
  };
  useEffect(() => {
    dispatch(getClassesActive());
  }, [isLoggedIn]);

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
            {showListening === "Listening" ? "" : <FilterClass handleClickLis={handleLevelListening} category="Listening" />}
          </Grid>
        </Grid>
        <Grid item sm={12} style={{ display: "flex" }} xs={12}>
          <Grid item sm={1} xs={4}>
            <Button variant="outlined" color="warning" sx={{ maxWidth: "25vmin", minWidth: "25vmin" }} onClick={() => handleSpeaking(showSpeaking)}>
              {showSpeaking === "Hide" ? "Clear Filter" : "Speaking"}
            </Button>
          </Grid>
          <Grid item sm={11} xs={8} justify="flex-end">
            {showSpeaking === "Speaking" ? "" : <FilterClass handleClickSpeak={handleLevelSpeaking} />}
          </Grid>
        </Grid>
        {classes.result?.map((el) => (
          <Grid key={el.id} item style={{ display: "flex" }} item sm={4} xs={12}>
            <BoxClass data={el} />
          </Grid>
        ))}
        <Grid item sm={12} xs={12} sx={{ mb: 2, mt: 1 }}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Pagination hidePrevButton hideNextButton onChange={handlePage} count={classes.totalPages} color="warning" />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
