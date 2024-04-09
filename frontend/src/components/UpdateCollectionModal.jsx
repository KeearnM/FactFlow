import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { blueGrey } from "@mui/material/colors";

//Material UI theme to change/customize the button color
const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
});

const UpdateCollectionModal = (props) => {
  return (
    <>
      <Modal
        open={open}
        onClose={props.handleCloseUpdateModal}
        aria-labelledby="update-collection-modal"
        aria-describedby="update-collection-modal"
      >
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={props.handleCloseUpdateModal}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                component="form"
                noValidate
                // onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h1"
                  >
                    Update Collection
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={props.modalData._id}
                    label={`${props.modalData.q}`}
                    // onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </Grid>
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick={()=>}
                  >
                    Submit
                  </Button>
                </ThemeProvider>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default UpdateCollectionModal;
