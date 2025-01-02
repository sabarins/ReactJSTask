import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, CircularProgress, Grid2, Rating } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Appbar from "./Appbar";

function Dashboard() {
  //   const { usrpassword } = useContext(Authusecontext) || "";
  let navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchinput, setSearchinput] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(event.target);
    const formtextdata = new FormData(event.target);
    const getdata = Object.fromEntries(formtextdata.entries());

    setSearchinput(getdata.searchinput);
  };

  console.log(searchinput);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          searchinput.length == 0
            ? `https://api.tvmaze.com/shows`
            : `https://api.tvmaze.com/search/shows?q=${searchinput}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        console.log(data[0]);
        setMovies(data.slice(0, 50));
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchinput]);

  return (
    <Grid2>
      {/* head  */}
      <Appbar />

      <Box m={5}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            style={{
              padding: "10px",
              width: "50%",
              justifyContent: "center",
              fontSize: "20px",
            }}
            name="searchinput"
            placeholder="type your favourite movie.."
            width={"100%"}
          ></input>
          <Button
            type="submit"
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              padding: "11px",
              textTransform: "none",
              mt: -0.6,
              borderRadius: 0,
            }}
          >
            Search
          </Button>
        </form>
      </Box>

      {/* desktop  */}
      {loading ? (
        <Typography variant="h5" fontWeight={"bold"} mt={2}>
          Loading ...
        </Typography>
      ) : (
        <>
          {/* Desktop view  */}
          <Grid2
            container
            sx={{ m: 10, display: { md: "flex", lg: "flex", xs: "none" } }}
            spacing={4}
            justifyContent="center"
          >
            {movies?.map((item, index) => {
              return (
                <Card
                  maxWidth={300}
                  key={index}
                  style={{ textDecoration: "none" }}
                  onClick={()=>navigate(`/ReactJSTask/dashboardmovie/${
                    item?.id ? item?.id : item?.show?.id
                  }`)}
                  // component={"a"}
                  // href={`/ReactJSTask/dashboardmovie/${
                  //   item?.id ? item?.id : item?.show?.id
                  // }`}
                >
                  <img
                    src={
                      item?.image?.original
                        ? item?.image?.original
                        : item?.show?.image?.original
                    }
                    width={300}
                    height={300}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" fontWeight={"bold"}>
                      {item?.name ? item?.name : item?.show?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item?.genres?.map((dis, ind) => {
                        return <Typography>{dis + " "}</Typography>;
                      })}

                      {item?.show?.genres?.map((dis, ind) => {
                        return <Typography>{dis + " "}</Typography>;
                      })}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "end",
                    }}
                  >
                    <Box sx={{ bgcolor: "lightgray", borderRadius: "5px" }}>
                      <Typography
                        color="white"
                        p={1}
                        sx={{ fontSize: "10px", fontWeight: "bold" }}
                      >
                        {item?.premiered
                          ? item?.premiered
                          : item?.show?.premiered}
                      </Typography>
                    </Box>
                    <Box>
                      <Rating
                        name="half-rating"
                        value={
                          item?.rating?.average / 5
                            ? item?.rating?.average / 5
                            : item?.show?.rating?.average / 5
                        }
                        readOnly
                        precision={0.1}
                        max={3}
                      />
                    </Box>
                    {/* <Typography size="small">Learn More</Typography> */}
                  </CardActions>
                </Card>
              );
            })}
          </Grid2>

          {/* mobile view  */}
          <Grid2
            container
            sx={{ m: 5, display: { md: "none", lg: "none", xs: "block" } }}
            justifyContent="center"
          >
            {movies?.map((item, index) => {
              return (
                <Card
                  sx={{ width: "100%", mb: 5 }}
                  key={index}
                  style={{ textDecoration: "none" }}
                  component={"a"}
                  href={`https://sabarins.github.io/ReactJSTask/dashboardmovie/${
                    item?.id ? item?.id : item?.show?.id
                  }`}
                >
                  <img src={item?.image?.original} width={300} height={300} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" fontWeight={"bold"}>
                      {item?.name ? item?.name : item?.show?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item?.genres?.map((dis, ind) => {
                        return <Typography>{dis + " "}</Typography>;
                      })}

                      {item?.show?.genres?.map((dis, ind) => {
                        return <Typography>{dis + " "}</Typography>;
                      })}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ bgcolor: "lightgray", borderRadius: "5px" }}>
                      <Typography
                        color="white"
                        p={1}
                        sx={{ fontSize: "10px", fontWeight: "bold" }}
                      >
                        {item?.ended ? item?.ended : item?.show?.ended}
                      </Typography>
                    </Box>
                    <Box>
                      <Rating
                        name="half-rating"
                        value={item?.rating?.average / 5}
                        readOnly
                        precision={0.1}
                        max={3}
                      />
                    </Box>
                    {/* <Typography size="small">Learn More</Typography> */}
                  </CardActions>
                </Card>
              );
            })}
          </Grid2>
        </>
      )}

    </Grid2>
  );
}

export default Dashboard;
