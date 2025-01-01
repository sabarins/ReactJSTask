import React, { useContext, useState } from "react";
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
} from "@mui/material";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { useNavigate } from "react-router-dom";
// import { Authusecontext } from "../App";

function Login() {
  // const { setUsrpassword } = useContext(Authusecontext) || "";

  const navigate = useNavigate();
  const [loguser, setLoguser] = useState([]);
  const [loginwrong, setLoginwrong] = useState(false);

  const loginhandleChange = (event) => {
    try {
      console.log("1");
      event.preventDefault();
      console.log(event.target);
      let getdata = new FormData(event.target);
      let data = Object.fromEntries(getdata.entries());
      let tmrypwd = data.password;
      // setUsrpassword(tmrypwd);
      let hashedpwd = bcrypt.hashSync(data.password, 10);
      data.password = hashedpwd;
      console.log(data.email, typeof tmrypwd);

      let getregisteredusers = JSON.parse(localStorage.getItem("userdatas"));
      console.log("2");

      let match = getregisteredusers?.filter(
        (users) =>
          users.email == data.email &&
          bcrypt.compareSync(tmrypwd, users.password)
      );

      console.log(match);
  

      if (match?.length > 0) {
        Cookies.set("userloggedsession", JSON.stringify(match), { expires: 1 });
        // localStorage.setItem("userlogged", JSON.stringify(match));
        navigate("/dashboardmovie");
      } else if (!match || match?.length === 0) {
        setLoginwrong(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  console.log(loginwrong);

  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container columnSpacing={2} p={3} mt={2}>
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
                  Welcome Back{" "}
                  <WavingHandIcon sx={{ color: "#ffde6f", fontSize: "35px" }} />
                </Typography>

                <Box>
                  <Typography>
                    Today is a new day. It's your day. Your shape it.
                  </Typography>
                  <Typography fontWeight={"bold"}>
                    Login to start managing your projects.
                  </Typography>
                </Box>

                <form
                  style={{ display: "grid", rowGap: "20px" }}
                  onSubmit={loginhandleChange}
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
                  {loginwrong ? (
                    <Box>
                      <Alert severity="error">
                        {"Invalid credentials or account not exists"}
                      </Alert>

                      <Typography color="red"></Typography>
                    </Box>
                  ) : null}

                  {/* forgetpass */}
                  <Box sx={{ textAlign: "end" }}>
                    <Button sx={{ textTransform: "none" }}>
                      Forget Password?
                    </Button>
                  </Box>

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
                      Sign in
                    </Button>
                  </Box>

                  <Box>
                    <Divider spacing={1}>Or</Divider>
                  </Box>

                  {/* sign up button  */}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography>
                      Don't you have an account?
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={handleSignup}
                      >
                        Sign up
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

export default Login;
