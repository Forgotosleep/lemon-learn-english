import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks, setTasks } from "../../store/actions/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function TasksList({ classId }) {
  const dispatch = useDispatch();
  const { data: tasks, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    setTasks([]);
    dispatch(getTasks(`classId=${classId}`));
  }, []);

  function onClickCard() {}

  async function onDelete(id) {
    console.log("onDelete()");
    try {
      const result = await Swal.fire({
        title: "Delete task?",
        // text: "Delete Task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        await dispatch(deleteTask(id));
        dispatch(getTasks(`classId=${classId}`));
        Swal.fire("Deleted!", "Task has been deleted.", "success");
      }
    } catch (error) {}
  }

  if (loading) return <></>;

  return (
    <>
      <div
        class="row"
        style={{
          width: "100%",
          margin: "2rem auto",
          textAlign: "left",
          // backgroundColor: "cyan",
        }}
      >
        {tasks.map((task) => (
          <div class="col-3">
            <div
              key={task.id}
              class="card mt-4"
              style={{
                width: "240px",
                height: "10rem",
                cursor: "pointer",
                margin: "auto",
              }}
              //   onClick={() => onClickCard(task.id)}
            >
              <div class="card-body">
                <div class="">
                  <h5
                    class="card-title"
                    style={{
                      height: "50px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {task.name}
                  </h5>
                </div>
                <div
                  style={{
                    height: "50px",
                    overflow: "hidden",
                  }}
                >
                  {task.description}
                </div>
                <div style={{ overflow: "hidden", marginTop: "10px" }}>
                  <FontAwesomeIcon
                    style={{ float: "right" }}
                    icon={faTrash}
                    onClick={() => onDelete(task.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
