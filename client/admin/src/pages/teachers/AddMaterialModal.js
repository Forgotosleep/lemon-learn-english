import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMaterial, getMaterials } from "../../store/actions/material";

export default function ({ classId }) {
  const dispatch = useDispatch();
  const [closeBtn, setCloseBtn] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classId: Number(classId), // not changed
    materialUrl: "",
  });

  async function onClickModal() {
    console.log("class ID:", formData.classId);
    const success = await dispatch(addMaterial(formData));
    if (success) {
      dispatch(getMaterials(`classId=${classId}`));
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
      id="materialModal"
      tabindex="-1"
      aria-labelledby="materialModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style={{ top: "20%" }}>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="materialModalLabel">
              Add New Material
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
                  Material Url
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
              Add Material
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
