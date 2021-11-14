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
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Class One</td>
            <td>Beginner</td>
            <td>Listening</td>
            <td></td>
          </tr> */}

          {classes?.length ? (
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
      </table>
    </>
  );
}
