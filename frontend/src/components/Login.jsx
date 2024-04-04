/*=============================================================================
 | Purpose:  MODAL FOR LOGIN & REGISTRATION INPUTS. USING MATERIAL UI LOGIN 
 |           TEMPLATE FOR INPUT FIELDS CONSISTENT STYLING. TEMPLATE LINKS:
 |           - https://mui.com/material-ui/getting-started/templates/
 |           - https://github.com/mui/material-ui/tree/v5.15.14/docs/data/material/getting-started/templates/sign-in-side
 |           - https://github.com/mui/material-ui/blob/v5.15.14/docs/data/material/getting-started/templates/sign-up/SignUp.js
 |
 | Input / Parameters:  RECEIVES THE handleClose HANDLER AS A PROP FROM NAVBAR
 |                      THAT IS CONTROLLING THE STATE FOR MODAL VISIBILITY
 |   
 | Output / Returns:  RENDERS LOGIN SCREEN WITHIN THE MODAL AND ONCLICK RENDER
 |                    REGISTRATION SCREEN AND VICE-VERSA
 |
 *===========================================================================*/

import React, { useState } from "react";

//importing MaterialUI components and icons
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
  const [showLogin, setShowLogin] = useState(true);

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
                {showLogin ? "Sign in" : "Sign up"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {showLogin ? (
                  <Grid>
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
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={() => setShowLogin(false)}
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={() => setShowLogin(true)}
                        >
                          {"Already have an account? Sign in"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {showLogin ? "Sign In" : "Sign Up"}
                  </Button>
                </ThemeProvider>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default Login;
