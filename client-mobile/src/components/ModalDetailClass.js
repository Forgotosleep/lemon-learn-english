import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { brown } from "@mui/material/colors";
import { alertSuccess, alertSure } from "../assets/js/sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55vmin",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 20,
  p: 4,
  borderRadius: 2,
  color: brown[400],
};

function ModalDetailClass(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = props;

  const handleJoin = async () => {
    setOpen(false);
    const result = await alertSure();
    if (result.value) {
      alertSuccess(data.id);
    }
  };

  const incomplete = () => {
    let temp = 0;
    for (const key in data.StudentClasses) {
      if (data.StudentClasses[key].status === "incomplete") {
        temp += 1;
      }
    }
    return temp;
  };
  const complete = () => {
    let temp = 0;
    for (const key in data.StudentClasses) {
      if (data.StudentClasses[key].status === "complete") {
        temp += 1;
      }
    }
    return temp;
  };

  return (
    <div>
      <Button sx={{ maxWidth: "20vmin", minWidth: "20vmin" }} variant="outlined" color="info" onClick={handleOpen}>
        Detail
      </Button>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data.name}
          </Typography>
          <Grid container>
            <Grid item sm={3} xs={5}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                sx={{
                  mt: 2,
                }}
                color="text.secondary"
              >
                Teacher
              </Typography>
            </Grid>
            <Grid item sm={1} xs={2}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                sx={{
                  mt: 2,
                }}
                color="text.secondary"
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={8} xs={5}>
              <Typography
                fontSize={{
                  md: 16,
                  xs: 16,
                }}
                sx={{
                  mt: 2,
                }}
              >
                {data.teacher.name}
              </Typography>
            </Grid>
            <Grid item sm={3} xs={5}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                color="text.secondary"
              >
                Category
              </Typography>
            </Grid>
            <Grid item sm={1} xs={2}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                color="text.secondary"
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={8} xs={5}>
              <Typography
                fontSize={{
                  md: 16,
                  xs: 16,
                }}
              >
                {data.Category.name}
              </Typography>
            </Grid>
            <Grid item sm={3} xs={5}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                color="text.secondary"
              >
                Level
              </Typography>
            </Grid>
            <Grid item sm={1} xs={2}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                color="text.secondary"
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={8} xs={5}>
              <Typography
                fontSize={{
                  md: 16,
                  xs: 16,
                }}
              >
                {data.Level.name}
              </Typography>
            </Grid>
            <Grid item sm={3} xs={5}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                color="text.secondary"
              >
                Participant
              </Typography>
            </Grid>
            <Grid item sm={1} xs={2}>
              <Typography
                fontSize={{
                  md: 15,
                  xs: 15,
                }}
                color="text.secondary"
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={8} xs={5}>
              <Typography
                fontSize={{
                  md: 16,
                  xs: 16,
                }}
              >
                {incomplete()} / 30
              </Typography>
            </Grid>
          </Grid>
          <Typography id="modal-modal-footer" sx={{ mt: 3 }}>
            <Button variant="outlined" color="error" sx={{ maxWidth: "20vmin", minWidth: "20vmin" }} onClick={handleClose}>
              Close
            </Button>
            <Button variant="outlined" color="warning" sx={{ ml: 1, maxWidth: "20vmin", minWidth: "20vmin" }} onClick={handleJoin}>
              Join
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDetailClass;
