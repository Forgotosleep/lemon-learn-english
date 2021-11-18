import { fetchMyClasses } from "../store/actions/actionMyClasses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BoxMyClass from "../components/BoxMyClass";
import { Grid, Typography } from "@mui/material";
import { brown } from "@mui/material/colors";
function Class() {
  const dispatch = useDispatch();
  const { myClasses, isLoading, isError } = useSelector((state) => state.myClasses);
  const getMyClasses = () => {
    dispatch(fetchMyClasses());
  };
  console.log(myClasses);
  useEffect(() => {
    getMyClasses();
  }, []);

  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid ml={2} sm={12} xs={12}>
          <Typography
            sx={{
              color: brown[400],
            }}
            fontSize={{
              md: 50,
              xs: 50,
            }}
          >
            My Class
          </Typography>
        </Grid>
        {myClasses?.map((myClass) => (
          <Grid key={myClass.id} item style={{ display: "flex" }} item sm={4} xs={12}>
            <BoxMyClass myClass={myClass} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Class;
