import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, getClasses } from "../../store/actions/class";

export default function () {
  const dispatch = useDispatch();
  const { data: classes, loading, error } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  function onEdit(e, id) {
    e.preventDefault();
  }

  function onDelete(e, id) {
    e.preventDefault();
    dispatch(deleteClass(id));
  }

  if (loading) return <></>;

  return (
    <>
      <div
        class="row"
        style={{
          width: "100%",
          margin: "2rem auto",
          padding: "1rem",
          textAlign: "left",
          // backgroundColor: "cyan",
        }}
      >
        {classes?.length ? (
          classes.map((c) => (
            <div class="col-3">
              <div
                key={c.id}
                class="card mt-4"
                style={{ width: "18rem", height: "9rem", cursor: "pointer" }}
              >
                <div class="card-body">
                  <div class="">
                    <h5
                      class="card-title"
                      style={{ height: "50px", textOverflow: "ellipsis" }}
                    >
                      {c.name}
                    </h5>
                  </div>
                  <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mt-4  mb-2 text-muted">
                      {c.Category.name}
                    </h6>
                    <h6 class="card-subtitle mt-4 mb-2 text-muted">
                      {c.Level.name}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
        <div class="col-3">
          <div class="card mt-4" style={{ width: "18rem", height: "9rem" }}>
            <div class="card-body">
              <h5
                class="card-title"
                style={{
                  height: "50px",
                  overflow: "hidden",
                }}
              >
                Class Name very long that it will note fit in the class name
                normal field
              </h5>
              <div class="d-flex justify-content-between">
                <h6 class="card-subtitle mt-4  mb-2 text-muted">Category</h6>
                <h6 class="card-subtitle mt-4 mb-2 text-muted">Level</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody> */}
      {/* <tr>
            <td>Class One</td>
            <td>Beginner</td>
            <td>Listening</td>
            <td></td>
          </tr> */}

      {/* {classes?.length ? (
            classes.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.Level.name}</td>
                <td>{c.Category.name}</td>
                <td>
                  <a
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => onEdit(e, c.id)}
                  >
                    Edit
                  </a>
                  <a
                    className="btn btn-danger btn-sm"
                    onClick={(e) => onDelete(e, c.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )} 
        </tbody>
      </table>*/}
    </>
  );
}
