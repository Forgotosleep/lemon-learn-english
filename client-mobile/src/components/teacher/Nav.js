import React, { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper, Icon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { yellow, brown, deepOrange } from "@mui/material/colors";

import pikachu from "../../assets/icon/pikachu.svg";
import meowth from "../../assets/icon/meowth.svg";
import bulbasaur from "../../assets/icon/bulbasaur.svg";

const useStyles = makeStyles({
  root: {
    color: brown[700],
    "&.Mui-selected": {
      color: deepOrange[500],
    },
  },
  back: {
    backgroundColor: yellow[600],
  },
});

export default function Nav() {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);
  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation className={classes.back} showLabels value={value}>
        <BottomNavigationAction
          className={classes.root}
          value="/"
          LinkComponent={Link}
          to="/"
          label="Home"
          icon={
            <Icon>
              <img src={pikachu} alt="pikachu" height={25} width={25} />
            </Icon>
          }
        />
        <BottomNavigationAction
          className={classes.root}
          value="/profile"
          LinkComponent={Link}
          to="/profile"
          label="Profile"
          icon={
            <Icon>
              <img src={bulbasaur} alt="bulbasaur" height={25} width={25} />
            </Icon>
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
