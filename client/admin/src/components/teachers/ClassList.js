import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteClass,
  getClasses,
  setClassDetails,
} from "../../store/actions/class";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  function onClickCard(id) {
    dispatch(setClassDetails({}));
    navigate(`/dashboard/class/${id}`);
  }

  if (loading) return <></>;

  return (
    <>
      {/* <div>
        <h3>filter</h3>
      </div> */}

      <div
        style={{
          backgroundColor: "#bababa",
          // padding: "10px",
          borderRadius: "20px",
          minHeight: "600px",
          width: "1200px",
          boxSizing: "border-box",
        }}
      >
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
                  style={{
                    width: "240px",
                    height: "9rem",
                    cursor: "pointer",
                    margin: "auto",
                  }}
                  onClick={() => onClickCard(c.id)}
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
        </div>
      </div>
    </>
  );
}
