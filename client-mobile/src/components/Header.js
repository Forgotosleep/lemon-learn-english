import { AppBar, Toolbar, Icon, IconButton, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { yellow, brown } from "@mui/material/colors";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import psyduck from "../assets/icon/psyduck.svg";
import { useDispatch } from "react-redux";
import { getUser, setUser } from "../store/actions/actionUser";
import { setScore, setScores } from "../store/actions/actionScores";
import { setTask, setTasks } from "../store/actions/actionTasks";
import { setClasses } from "../store/actions/actionClasses";

export default function Header() {
  const dispatch = useDispatch();

  const location = useLocation();
  const id = Number(location.pathname.substr(7));
  const [value, setValue] = useState(location.pathname);
  const color = {
    backgroundColor: yellow[600],
    color: brown[700],
  };
  function capitalizeFirstLetter([first, ...rest]) {
    return [first.toUpperCase(), ...rest].join("");
  }

  const setEmpty = () => {
    dispatch(setTask({}));
  };
  useEffect(() => {
    if (location.pathname === "/") {
      setValue("Home");
    } else if (location.pathname.substr(0, 8) === "/myclass") {
      setValue("My Class");
    } else if (location.pathname === "/tasks/" + id) {
      setValue("My Tasks");
    } else if (location.pathname.substr(0, 6) === "/tasks") {
      setValue("Tasks");
    } else if (location.pathname.substr(0, 9) === "/speaking") {
      setValue("Speaking");
    } else if (location.pathname.substr(0, 8) === "/myclass") {
      setValue("My Class");
    } else if (location.pathname === "/search-song") {
      setValue("Search Song");
    } else if (location.pathname.substr(0, 22) === "/create-listening-task") {
      setValue("Create Task");
    } else if (location.pathname.substr(0, 17) === "/listening-answer") {
      setValue("Listening Answer");
    } else {
      setValue(capitalizeFirstLetter(location.pathname.substr(1)));
    }
  }, [location.pathname]);

  const DisplayDesktop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
      dispatch(setUser({}));
      dispatch(setClasses([]));

      dispatch(setTask({}));
      dispatch(setTasks([]));

      dispatch(setScore({}));
      dispatch(setScores([]));

      localStorage.removeItem("access_token");
      navigate("/login");
    }

    return (
      <>
        <Toolbar>
          {value === "My Class" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "Tasks" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "Search Song" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "Create Task" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "My Tasks" ? (
            <IconButton component={Link} to="/class">
              <ArrowBack />
            </IconButton>
          ) : value === "Listening Answer" ? (
            <IconButton onClick={setEmpty} component={Link} to={`/tasks/${location.state?.id}`}>
              <ArrowBack />
            </IconButton>
          ) : (
            <Icon sx={{ mr: 2 }}>
              <img src={psyduck} alt="psyduck" height={25} width={25} />
            </Icon>
          )}
          <strong>{value}</strong>
          <Button size="small" variant="contained" color="primary" onClick={logout} style={{ marginLeft: "auto", padding: "10px" }}>
            Logout
          </Button>
        </Toolbar>
      </>
    );
  };

  return (
    <header>
      <AppBar position="static" style={color}>
        {DisplayDesktop()}
      </AppBar>
    </header>
  );
}
