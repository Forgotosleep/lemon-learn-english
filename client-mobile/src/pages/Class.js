import { fetchMyClasses } from "../store/actions/actionMyClasses";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import BoxMyClass from "../components/BoxMyClass";
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
      <div className="container">
        <h1>Your Classes</h1>
        {
          myClasses?.map(myClass => (
            <BoxMyClass myClass={myClass} ></BoxMyClass>
          ))
        }
      </div>
    </>
  );
}

export default Class;
