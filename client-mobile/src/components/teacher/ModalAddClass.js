import { Button, Modal, Toast } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addClass } from "../../store/actions/actionClasses";
import { alertSure } from "../../assets/js/sweetalert2";

function ModalAddClass() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [validate, setValidate] = useState({
    name: false,
    levelId: false,
    categoryId: false,
  });
  const handleClose = () => {
    setShow(false);
    setData({});
    setValidate({ name: false, levelId: false, categoryId: false });
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setValidate({ ...validate, [e.target.name]: true });
    }

    setData({ ...data, [e.target.name]: value });
  };

  const handleShow = () => {
    setShow(true);
    setData({});
    setValidate({ name: false, levelId: false, categoryId: false });
  };

  const toast = (show) => {
    return (
      <Toast className="mb-1" bg="danger" show={show}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">required</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
      </Toast>
    );
  };

  const handleSubmit = async (e) => {
    if (!data["name"]) {
      setValidate({ name: true });
    } else if (!data["levelId"]) {
      setValidate({ levelId: true });
    } else if (!data["categoryId"]) {
      setValidate({ categoryId: true });
    } else {
      setShow(false);
      setValidate({ name: false, levelId: false, categoryId: false });
      const result = await alertSure();

      if (result.value) {
        dispatch(addClass(data));
      }
    }
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Add Class
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label className="mb-2">Class Name</label>
              {toast(validate.name)}
              <input className="form-control" onChange={handleChange} name="name" />
              <label className="mb-2 mt-2">Category</label>
              {toast(validate.categoryId)}
              <select className="form-select" onChange={handleChange} name="categoryId">
                <option>--- Select ---</option>
                <option value="1">Listening</option>
                <option value="2">Speaking</option>
              </select>
              <label className="mb-2 mt-2">Level</label>
              {toast(validate.levelId)}
              <select className="form-select" onChange={handleChange} name="levelId">
                <option>--- Select ---</option>
                <option value="1">Beginner</option>
                <option value="2">Medium</option>
                <option value="3">advanced</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddClass;
