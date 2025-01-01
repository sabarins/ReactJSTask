import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Authusecontext } from "../App";
import { Grid2 } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TheatersIcon from "@mui/icons-material/Theaters";

function Dashboard(props) {
  //   const { usrpassword } = useContext(Authusecontext) || "";
  let navigate = useNavigate();
  const [usrprofilename, setUsrprofilename] = useState([]);

  //   console.log(typeof usrpassword.toString());
  useEffect(() => {
    let currentuser = JSON.parse(localStorage.getItem("userdatas"));
    let dataloggeduserchchk = JSON.parse(Cookies.get("userloggedsession"));
    setUsrprofilename(dataloggeduserchchk?.[0].email);

    console.log(dataloggeduserchchk);

    let match = currentuser?.filter(
      (users) => users.email == dataloggeduserchchk?.[0].email
    );

    if (match?.length == 0 || !match) {
      navigate("/");
    }

    // console.log(dataloggeduserchchk, currentuser, match);
  }, []);

  const handleLogoutchange = () => {
    Cookies.remove('userloggedsession');
    navigate("/");
  };

  return (
    <Grid2 sx={{ bgcolor: "black" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <TheatersIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              //   noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                // mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MyMoviesApp
            </Typography>

            <TheatersIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MyMoviesApp
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={usrprofilename}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt={usrprofilename}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Button
                type="submit"
                sx={{ bgcolor: "red", color: "white", ml: 2 }}
                onClick={handleLogoutchange}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Grid2>
  );
}

export default Dashboard;
