import { AppBar, Toolbar, Icon } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { yellow, brown } from "@mui/material/colors";
import psyduck from "../assets/icon/psyduck.svg";
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
    } else if (location.pathname.substr(0, 6) === "/tasks") {
      setValue("Task")
    } else if (location.pathname.substr(0, 9) === "/speaking") {
      setValue("Speaking")
    } else {
      setValue(capitalizeFirstLetter(location.pathname.substr(1)));
    }
  }, [location.pathname]);
  const displayDesktop = () => {
    return (
      <>
        <Toolbar>
          <Icon sx={{ mr: 2 }}>
            <img src={psyduck} alt="psyduck" height={25} width={25} />
          </Icon>
          <strong>{value}</strong>
        </Toolbar>
      </>
    );
  };

  return (
    <header>
      <AppBar style={color}>{displayDesktop()}</AppBar>
    </header>
  );
}
