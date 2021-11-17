import { AppBar, Toolbar, Icon, IconButton, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { yellow, brown } from "@mui/material/colors";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import psyduck from "../assets/icon/psyduck.svg";
import { useDispatch } from "react-redux";
import { getUser, setUser } from "../store/actions/actionUser";
import { setScore, setScores } from "../store/actions/actionScores";
import { setTask, setTasks } from "../store/actions/actionTasks";
import { setClasses } from "../store/actions/actionClasses";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const color = {
    backgroundColor: yellow[600],
    color: brown[700],
  };
  function capitalizeFirstLetter([first, ...rest]) {
    return [first.toUpperCase(), ...rest].join("");
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setValue("Home");
    } else if (location.pathname.substr(0, 8) === "/myclass") {
      setValue("My Class");
    } else if (location.pathname.substr(0, 6) === "/tasks") {
      setValue("Tasks");
    } else if (location.pathname.substr(0, 9) === "/speaking") {
      setValue("Speaking");
    } else if (location.pathname.substr(0, 8) === "/myclass") {
      setValue("My Class");
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
          ) : (
            <Icon sx={{ mr: 2 }}>
              <img src={psyduck} alt="psyduck" height={25} width={25} />
            </Icon>
          )}
          <strong>{value}</strong>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={logout}
            style={{ marginLeft: "auto", padding: "10px" }}
          >
            Logout
          </Button>
        </Toolbar>
      </>
    );
  };

  return (
    <header>
      <AppBar style={color}>{DisplayDesktop()}</AppBar>
    </header>
  );
}
