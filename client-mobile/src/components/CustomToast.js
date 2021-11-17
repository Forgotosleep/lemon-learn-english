import { Toast, ToastContainer } from "react-bootstrap";

import { useState } from "react";

function CustomToast(props) {
  const { show } = props;
  const [showA, setShowA] = useState(show);
  const toggleShowA = () => setShowA(!showA);
  return (
    <>
      <ToastContainer position="middle-center">
        <Toast bg="danger" show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">Warning</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body style={{ color: "white" }}>this song didnt have a sound url, you must add sound url manually</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CustomToast;
