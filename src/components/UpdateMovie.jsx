import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieService from "../services/MovieService";

const UpdateMovie = () => {
  const navigate = useNavigate();

  const { movieName } = useParams();

  const [movie, setMovie] = useState({
    movieName: movieName,
    theaterName: "",
    noOfTicketsAvailable: 0,
    ticketStatus: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MovieService.getMoviesByMovieName(movieName);
        console.log(response);
        setMovie(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateMovie = (e) => {
    e.preventDefault();
    MovieService.updateMovie(movie, movieName)
      .then((response) => {
        navigate("/movieList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wmovieNameer">
          <h1>Update Movie</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Movie Name
          </label>
          <input
            type="text"
            name="movieName"
            value={movieName}
            onChange={(event) => handleChange(event)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col">
           
              <div className="mb-4 border-4 rounded">
                <div>
                  <label
                    htmlFor={`theaterName`}
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Theater Name
                  </label>
                  <input
                    type="text"
                    id={`theaterName`}
                    name="theaterName"
                    value={movie.theaterName}
                    onChange={(event) => handleChange(event)}
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`noOfTicketsAvailable`}
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Available Seat
                  </label>
                  <input
                    type="text"
                    id={`noOfTicketsAvailable`}
                    name="noOfTicketsAvailable"
                    value={movie.noOfTicketsAvailable}
                    onChange={(event) => handleChange(event)}
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`ticketStatus`}
                    className="block font-medium mb-1 mt-2 ml-3"
                  >
                    Booking Status (BOOK ASAP / SOLDOUT)
                  </label>
                  <select
                    id={`ticketStatus`}
                    name="ticketStatus"
                    value={movie.ticketStatus}
                    onChange={(event) => handleChange(event)}
                    className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-2"
                  >
                    <option value="BOOK ASAP">BOOK ASAP</option>
                    <option value="SOLD OUT">SOLD OUT</option>
                  </select>
                  {movie.ticketStatus && (
                    <p>You selected: {movie.ticketStatus}</p>
                  )}
                </div>
              </div>
            
          </div>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateMovie}
            id="updateSubmitBtn"
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/movieList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
