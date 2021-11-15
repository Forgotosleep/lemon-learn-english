import { Icon, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { brown, deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import charmander from "../assets/icon/charmander.svg";
import charmeleon from "../assets/icon/charmeleon.svg";
import charizard from "../assets/icon/charizard.svg";
import squirtle from "../assets/icon/squirtle.svg";
import wartorle from "../assets/icon/wartorle.svg";
import blastoise from "../assets/icon/blastoise.svg";
const useStyles = makeStyles({
  root: {
    color: brown[700],

    "&.Mui-selected": {
      color: deepOrange[500],
    },
  },
  back: {
    backgroundColor: "lightyellow",
  },
});

function FilterClass(props) {
  const { handleClickLis, category, handleClickSpeak } = props;
  console.log(category);
  const classes = useStyles();
  const [value, setValue] = useState();
  return (
    <>
      {category === "Listening" ? (
        <BottomNavigation
          className={classes.back}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleClickLis(newValue + 1);
          }}
        >
          <BottomNavigationAction
            className={classes.root}
            sx={{
              color: brown[400],
            }}
            label="Beginner"
            icon={
              <Icon sx={{ fontSize: 40 }}>
                <img src={charmander} alt="pikachu" height={40} width={40} />
              </Icon>
            }
          />
          <BottomNavigationAction
            className={classes.root}
            sx={{
              color: brown[400],
            }}
            label="Medium"
            icon={
              <Icon sx={{ fontSize: 40 }}>
                <img src={charmeleon} alt="pikachu" height={40} width={40} />
              </Icon>
            }
          />
          <BottomNavigationAction
            className={classes.root}
            sx={{
              color: brown[400],
            }}
            label="Advanced"
            icon={
              <Icon sx={{ fontSize: 40 }}>
                <img src={charizard} alt="pikachu" height={40} width={40} />
              </Icon>
            }
          />
        </BottomNavigation>
      ) : (
        <>
          <BottomNavigation
            className={classes.back}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              handleClickSpeak(newValue + 1);
            }}
          >
            <BottomNavigationAction
              className={classes.root}
              sx={{
                color: brown[400],
              }}
              label="Beginner"
              icon={
                <Icon sx={{ fontSize: 40 }}>
                  <img src={squirtle} alt="pikachu" height={40} width={40} />
                </Icon>
              }
            />
            <BottomNavigationAction
              className={classes.root}
              sx={{
                color: brown[400],
              }}
              label="Medium"
              icon={
                <Icon sx={{ fontSize: 40 }}>
                  <img src={wartorle} alt="pikachu" height={40} width={40} />
                </Icon>
              }
            />
            <BottomNavigationAction
              className={classes.root}
              sx={{
                color: brown[400],
              }}
              label="Advanced"
              icon={
                <Icon sx={{ fontSize: 40 }}>
                  <img src={blastoise} alt="pikachu" height={40} width={40} />
                </Icon>
              }
            />
          </BottomNavigation>
        </>
      )}
    </>
  );
}

export default FilterClass;
