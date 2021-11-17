import { fetchMyClasses } from "../store/actions/actionMyClasses";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import BoxMyClass from "../components/BoxMyClass";
import { Grid } from "@mui/material"
function Class() {
  const dispatch = useDispatch()
  const { myClasses, isLoading, isError } = useSelector(state => state.myClasses)
  const getMyClasses = () => {
    dispatch(fetchMyClasses())
  }
  useEffect(() => {
    getMyClasses()
  }, [])

  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid sm={12} xs={12}>
          <h1>Your Classes</h1>
        </Grid>
        {
          myClasses?.map(myClass => (
            <Grid key={myClass.id} item style={{ display: "flex" }} item sm={4} xs={12}>
              <BoxMyClass myClass={myClass} />
            </Grid>
          ))
        }
      </Grid>
    </>
  );
}

export default Class;
