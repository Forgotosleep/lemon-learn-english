import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCategories } from "../../store/actions/category";
import { addClass } from "../../store/actions/class";
import { getLevels } from "../../store/actions/level";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: categories, loading: catLoading } = useSelector(
    (state) => state.category
  );
  const { data: levels, loading: lvlLoading } = useSelector(
    (state) => state.level
  );
  const [formData, setFormData] = useState({
    name: "",
    levelId: 0,
    categoryId: 0,
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLevels());
  }, []);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    dispatch(addClass(formData)).then(() => {
      navigate("/dashboard/class");
    });
  }

  return (
    <>
      <form
        style={{ width: "500px", margin: "auto", textAlign: "left" }}
        onSubmit={onSubmit}
      >
        <h3 className="mb-4">Add Class</h3>
        <div class="form-group mt-4">
          <label for="name" className="mb-3">
            Class Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={formData.name}
          />
        </div>
        <div class="form-group mt-4 text-left">
          <label for="level" className="mb-3">
            Level
          </label>
          <select
            class="form-select"
            id="level"
            name="levelId"
            onChange={onChange}
            value={formData.levelId}
          >
            <option value={0} selected disabled>
              Choose..
            </option>
            {lvlLoading ? (
              <></>
            ) : (
              levels?.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))
            )}
            {/* <option value={1}>beginner</option> */}
          </select>
        </div>

        <div class="form-group mt-4 text-left">
          <label for="category" className="mb-3">
            Category
          </label>
          <select
            class="form-select"
            id="category"
            name="categoryId"
            onChange={onChange}
            value={formData.categoryId}
          >
            <option value={0} selected disabled>
              Choose..
            </option>
            {catLoading ? (
              <></>
            ) : (
              categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
            {/* <option value={1}>listening</option>
            <option value={2}>Speaking</option> */}
          </select>
        </div>

        <div class="form-group mt-5" style={{ textAlign: "right" }}>
          <button type="submit" className="btn btn-primary">
            Add Class
          </button>
        </div>
      </form>
    </>
  );
}
