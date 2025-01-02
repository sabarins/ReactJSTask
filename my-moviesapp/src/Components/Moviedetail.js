import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appbar from "./Appbar";
import { Box, Grid2, Rating, Typography } from "@mui/material";

function Moviedetail(props) {
  const { id } = useParams();
  const [moviedetails, setMoviedetails] = useState([]);

  useEffect(() => {
    const fetchdetailMovies = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error("failed to fetch detail movie");
        }
        const data = await response.json();
        setMoviedetails(data);
      } catch (err) {
        console(err.message);
      }
    };

    fetchdetailMovies();
  }, []);


  return (
    <>
      {/* head  */}
      <Appbar />

      <Box sx={{ m: 5, display: { md: "block", lg: "block", xs: "none" } }}>
        <img src={moviedetails?.image?.original} width={500} height={500} />
      </Box>

      <Box
        sx={{
          m: 5,
          display: { md: "none", lg: "none", xs: "block" },
          justifyContent: "center",
        }}
      >
        <img src={moviedetails?.image?.original} width={"100%"} />
      </Box>

      <Box>
        <Typography>
          {moviedetails?.genres?.map((item, index) => {
            return (
              <>
                {index ? <>, </> : null}
                {item}
              </>
            );
          })}
        </Typography>
      </Box>

      <Box sx={{mt:2}}>
        <Rating
          name="half-rating"
          value={moviedetails?.rating?.average / 5}
          readOnly
          precision={0.1}
          max={3}
        />
      </Box>

      <Box m={3}>
        <Typography dangerouslySetInnerHTML={{ __html: moviedetails?.summary }}>
          {/* {} */}
        </Typography>
      </Box>
    </>
  );
}

export default Moviedetail;
