import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";

const AddMovie = () => {
  const navigate = useNavigate();

  const [moviereq, setMovieReq] = useState({
    movieName: "",
    theaterName: "",
    noOfTicketsAvailable: 0,
    ticketStatus: "",
  });
  const [newMovieAddError, setNewMovieAddError] = useState("");
  const [hasErrors, setHasErrors] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieReq({ ...moviereq, [name]: value });
    setHasErrors(false);
    setNewMovieAddError("");
  };

  const handleAddTheater = (event) => {
    setMovieReq({
      ...moviereq,
      theaterName: event.target.value,
    });
    setHasErrors(false);
    setNewMovieAddError("");
  };
  
  const verifyNewMovieReq = () => {
    if (moviereq.movieName === "") {
      setNewMovieAddError("Please enter the movie name...");
      setHasErrors(true);
    } else if (moviereq.theaterName === "") {
      setNewMovieAddError("Please enter the theater name...");
      setHasErrors(true);
    } else if (moviereq.noOfTicketsAvailable === 0) {
      setNewMovieAddError("Please select no of tickets available...");
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted the movie Req...");
    MovieService.saveMovie(moviereq)
      .then((response) => {
        navigate("/movieList");
      })
      .catch((error) => {
        if (error.response.data.message.includes("JWT expired"))
          setNewMovieAddError("Session Logged out please login again");
        else if (
          error.response.data.message.includes("Required request header")
        )
          setNewMovieAddError("You are not logged in, please login");
        else setNewMovieAddError("some error occur, contact Admin");
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setMovieReq({
      movieName: "",
      theaterName: "",
      noOfTicketsAvailable: "",
      ticketStatus: "",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
      <form>
        <div className="container mb-4 border-4 rounded">
          <label
            htmlFor="movieName"
            className="block font-medium mt-2 mb-2 ml-3"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            value={moviereq.movieName}
            onChange={handleChange}
            className="w-4/5 p-2 border border-gray-300 rounded ml-3 mb-4"
            required
          />
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
                  value={moviereq.theaterName}
                  onChange={(event) =>
                    // setMovieReq({
                    //   ...moviereq,
                    //   theaterName: event.target.value,
                    // })
                    handleAddTheater(event)
                  }
                  className="w-4/5 p-1 border border-gray-300 rounded ml-3"
                />
              </div>
              <div>
                <label
                  htmlFor={`availableSeat`}
                  className="block font-medium mb-1 mt-2 ml-3"
                >
                  Available Seat
                </label>
                
                <input
                  type="text"
                  id={`availableSeat`}
                  name="availableSeat"
                  value={moviereq.noOfTicketsAvailable}
                  onChange={(event) => {
                    setMovieReq({
                      ...moviereq,
                      noOfTicketsAvailable: event.target.value,
                    });
                    setHasErrors(false);
                    setNewMovieAddError("");
                  }}
                  className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-1"
                />
              </div>
              <div>
                <label
                  htmlFor={`ticketStatus`}
                  className="block font-medium mb-1 mt-2 ml-3"
                >
                  Booking Status
                </label>
                
                <select
                  id={`ticketStatus`}
                  name="ticketStatus"
                  value={moviereq.ticketStatus}
                  onChange={(event) =>
                    setMovieReq({
                      ...moviereq,
                      ticketStatus: event.target.value,
                    })
                  }
                  className="w-4/5 p-1 border border-gray-300 rounded ml-3 mb-2"
                >
                  <option value="">Select...</option>
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="BOOK ASAP">BOOK ASAP</option>
                  <option value="SOLD OUT">SOLD OUT</option>
                </select>

                
              </div>
            </div>
           
          </div>
        </div>
        {newMovieAddError && (
          <p className="mb-4 text-sm text-red-600">{newMovieAddError}</p>
        )}
        {!hasErrors && (
          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
            id="addNewMovieBtn"
              disabled={hasErrors}
              onMouseOver={verifyNewMovieReq}
              onClick={handleSubmit}
              className="rounded mr-4 text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
            >
              Save
            </button>
            <button
              onClick={reset}
              className="rounded ml-4 text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
            >
              Clear
            </button>
            <button
              onClick={() => navigate("/movieList")}
              className="rounded text-white font-semibold bg-violet-500 hover:bg-violet-700 py-2 px-6"
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddMovie;
