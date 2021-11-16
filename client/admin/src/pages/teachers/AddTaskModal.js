import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, getTasks } from "../../store/actions/task";

export default function ({ classId }) {
  const dispatch = useDispatch();
  const [closeBtn, setCloseBtn] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classId: Number(classId), // not changed
    soundUrl: "",
    question: "",
  });

  async function onClickModal() {
    console.log("class ID:", formData.classId);
    const success = await dispatch(addTask(formData));
    if (success) {
      dispatch(getTasks(`classId=${classId}`));
      closeBtn.click();
    }
  }

  function onChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div
      className="modal fade"
      id="addTaskModal"
      tabindex="-1"
      aria-labelledby="addTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style={{ top: "20%" }}>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTaskModalLabel">
              Add Task
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3" style={{ textAlign: "left" }}>
              <div class="mt-4">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder=""
                  onChange={onChangeInput}
                  value={formData.name}
                />
              </div>
              <div class="mt-4">
                <label for="name" class="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  name="description"
                  placeholder=""
                  onChange={onChangeInput}
                  value={formData.description}
                />
              </div>
              <div class="mt-4">
                <label for="name" class="form-label">
                  Sound Url
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="soundUrl"
                  name="soundUrl"
                  placeholder=""
                  onChange={onChangeInput}
                  value={formData.soundUrl}
                />
              </div>
              <div class="mt-4">
                <label for="name" class="form-label">
                  Question
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="question"
                  name="question"
                  placeholder=""
                  onChange={onChangeInput}
                  value={formData.question}
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={(input) => setCloseBtn(input)}
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={onClickModal}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
