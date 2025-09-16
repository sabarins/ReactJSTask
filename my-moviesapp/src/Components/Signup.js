import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Grid2 as Grid,
  Alert,
  Snackbar,
} from "@mui/material";
import bcrypt from "bcryptjs";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Signup() {
  const navigate = useNavigate();

  const [regusers, setRegusers] = useState(
    JSON.parse(localStorage.getItem("userdatas")) || ""
  );
  const [showalreadyacc, setShowalreadyacc] = useState(false);

  useEffect(() => {
    let dataloggeduserchchk = Cookies?.get("userloggedsession")
      ? JSON.parse(Cookies?.get("userloggedsession"))
      : null;

    if (dataloggeduserchchk?.length > 0) {
      navigate("/dashboardmovie");
    }
  }, []);

  useEffect(() => {
    let localdata = JSON.parse(localStorage.getItem("userdatas"));
    if (localdata) {
      setRegusers(localdata);
    }
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const signuphandleChange = (event) => {
    event.preventDefault();

    let getdata = new FormData(event.target);
    let data = Object.fromEntries(getdata.entries());
    let hashedpwd = bcrypt.hashSync(data.password, 10);
    let tmrypwd = data.password;
    data.password = hashedpwd;

    // check if already have an account
    let getregisteredusers = JSON.parse(localStorage.getItem("userdatas"));
    let match = getregisteredusers?.filter(
      (users) => users.email == data.email
    );

    if (match?.length == 0 || !match) {
      setShowalreadyacc(false);
      let datas = [...regusers, data];

      setRegusers([...regusers, data]);

      // new register users stored to local storage
      localStorage.setItem("userdatas", JSON.stringify(datas));
      setOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
      // navigate("/");
    } else if (match?.length > 0) {
      setShowalreadyacc(true);
    }


    event.target.reset();
  };

  return (
    <Stack
      sx={{
        // display: { md: "block", xs: "none" },
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container columnSpacing={2} p={3} mt={2}>
          <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} sx={{display:"flex",mt:{lg:-80,md:-80},top:{md:10,lg:10},ml:{lg:70,md:70}}}>
            <Alert
              // onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%", }}
            
            >
              Account created successfully
            </Alert>
          </Snackbar>
          <Grid size={{ lg: 5.5, xs: 12 }}>
            <Box sx={{ display: "flex", alignContent: "center" }}>
              <img
                src="https://sabarins.github.io/ReactJSTask/LoginImg/login_img.png"
                width="100%"
                style={{
                  border: "0px solid grey",
                  borderRadius: "10px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ lg: 6.5, xs: 12 }} sx={{ textAlign: "left" }}>
            <Grid>
              <Box
                sx={{
                  display: "grid",
                  rowGap: "20px",
                  justifyContent: "center",
                  alignContent: "flex-end",
                  width: "100%",
                  mt: 5,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Welcome Sabari Nathan{" "}
                  <WavingHandIcon sx={{ color: "#ffde6f", fontSize: "35px" }} />
                </Typography>

                <Box>
                  <Typography fontSize={{xs:"15px"}} mb={2}>
                    Today is a new day. It's your day. Your shape it.
                  </Typography>
                  <Typography sx={{fontWeight:'bold'}}>
                    Sign up to start managing your projects.
                  </Typography>
                </Box>

                <form
                  style={{ display: "grid", rowGap: "20px" }}
                  onSubmit={signuphandleChange}
                >
                  {/* Email input  */}
                  <Box sx={{ display: "grid" }}>
                    <label>Email</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      required
                      type="email"
                      placeholder="Example@gmail.com"
                      sx={{ width: "100%", mt: 1 }}
                      name="email"
                      slotProps={{
                        input: {
                          style: {
                            borderRadius: "10px",
                            backgroundColor: "#F8FAFC",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Password input  */}
                  <Box sx={{ display: "grid" }}>
                    <label>Password</label>
                    <TextField
                      id="outlined-basic2"
                      required
                      variant="outlined"
                      placeholder="At least 8 characters"
                      sx={{ width: "100%", mt: 1 }}
                      type="password"
                      name="password"
                      slotProps={{
                        input: {
                          style: {
                            borderRadius: "10px",
                            backgroundColor: "#F8FAFC",
                          },
                        },
                      }}
                    />
                  </Box>

                  {showalreadyacc ? (
                    <Box>
                      <Alert severity="error">{"Account already exists"}</Alert>
                    </Box>
                  ) : null}

                  {/* forgetpass */}
                  {/* <Box sx={{ textAlign: "end" }}>
                    <Button sx={{ textTransform: "none" }}>
                      Forget Password?
                    </Button>
                  </Box> */}

                  {/* sign in button  */}
                  <Box>
                    <Button
                      type="submit"
                      sx={{
                        bgcolor: "#1C325B",
                        color: "white",
                        width: "100%",
                        borderRadius: "10px",
                        height: "50px",
                        textTransform: "none",
                      }}
                    >
                      Sign up
                    </Button>
                  </Box>

                  <Box>
                    <Divider spacing={1}>Or</Divider>
                  </Box>

                  {/* sign up button  */}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography>
                      Already have an account?
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Sign in
                      </Button>
                    </Typography>
                  </Box>
                </form>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CopyrightIcon sx={{ color: "grey" }} />
                  <Typography variant="h7" sx={{ color: "grey" }}>
                    {" "}
                    2025 ALL RIGHTS ARE RESERVED
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default Signup;
