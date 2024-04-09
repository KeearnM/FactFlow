import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const FactCheckModal = (prop) => {
  return (
    <Modal
      open={prop.open}
      onClose={prop.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          color: "text.primary",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Fact Check Result
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {prop.result}
        </Typography>
      </Box>
    </Modal>
  );
};

export default FactCheckModal;
