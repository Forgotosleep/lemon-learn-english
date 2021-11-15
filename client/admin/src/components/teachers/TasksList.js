import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setTasks } from "../../store/actions/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TasksList({ classId }) {
  const dispatch = useDispatch();
  const { data: tasks, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    setTasks([]);
    dispatch(getTasks(`classId=${classId}`));
  }, []);

  function onClickCard() {}

  function onDelete() {
    console.log("fuck yeah");
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
                height: "9rem",
                cursor: "pointer",
                margin: "auto",
              }}
              //   onClick={() => onClickCard(task.id)}
            >
              <div class="card-body">
                <div class="">
                  <h5
                    class="card-title"
                    style={{ height: "30px", textOverflow: "ellipsis" }}
                  >
                    {task.name}
                  </h5>
                </div>
                <div style={{ height: "60px", overflow: "hidden" }}>
                  {task.description}
                </div>
                <div style={{ overflow: "hidden" }}>
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
