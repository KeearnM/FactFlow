/*=============================================================================
 | Purpose:  MODAL LOGIN & LOGIN INPUTS
 |           USING MATERIAL UI LOGIN TEMPLATE FOR INPUT STYLING
 |           TEMPLATE: https://mui.com/material-ui/getting-started/templates/
 | Input / Parameters:  RECEIVES THE handleClose HANDLER AS A PROP FROM NAVBAR
 |                      THAT IS CONTROLLING THE STATE FOR MODAL VISIBILITY
 |   
 | Output / Returns:  RENDERS LOGIN SCREEN AND REGISTRATION SCREEN ONCLICK
 |
 *===========================================================================*/

import React from "react";

//importing MaterialUI components and icons
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

const Login = ({ handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </ThemeProvider>
                {/* <Grid container> */}
                {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                {/* </Grid> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default Login;
