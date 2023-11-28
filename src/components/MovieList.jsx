import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";
import Movie from "./Movie";

const MovieList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [newMovieAddError, setNewMovieAddError] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("userType");
    setIsAdmin(role);
  }, [isAdmin, location]);

  const filterArray = (data) => {
    const filteredArray = [];

    const arr = data.map((obj) => {
      if (!filteredArray.some((item) => item.movieName === obj.movieName)) {
        filteredArray.push(obj);
      }
    });

    return filteredArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await MovieService.getMovies();
        const uniqueArray = filterArray(response.data);
        setMovies(uniqueArray);
      } catch (error) {
        console.log("catching");
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteMovie = (e, movieName) => {
    e.preventDefault();
    MovieService.deleteMovie(movieName)
      .then((res) => {
        if (movies) {
          setMovies((prevElement) => {
            return prevElement.filter((movie) => movie.movieName !== movieName);
          });
        }
      })
      .catch((error) => {
        if (error.response.data.message.includes("Required request header"))
          setNewMovieAddError("You are not logged in, please login");
      });
  };

  return (
    <div className="container mx-auto my-8 max-w-2xl" id="maindiv">
      <h2 className="rounded flex justify-center text-xl font-bold mb-4 mt-8  bg-slate-600 text-white  px-6 py-2" key="mainh2">
        Welcome ! Book Your Movie Ticket here
      </h2>
      <div className="flex justify-center" id="firstdiv">
        {isAdmin === "ROLE_ADMIN" && (
          <button id="addNewMovie"
            onClick={() => navigate("/add-movie")}
            className="flex justify-center rounded mb-6 max-w-lg bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            Add New Released Movie
          </button>
        )}
      </div>
      <div className="flex justify-center shadow border-b w-auto" id="seconddiv">
        <table className="min-w-fit" key="table">
          <thead className="bg-emerald-400" id="thead">
            <tr>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6" id="allTh">
                Pick your favourite show from below list
              </th>
              {isAdmin === "ROLE_ADMIN" && (
                <th className="text-center font-medium text-gray-500 uppercase tracking-wmovieNameer py-3 px-6" id="adminTh">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white" id="tbody">
              {movies.map((movie,index) => (
                <Movie
                  
                  movie={movie}
                  deleteMovie={deleteMovie}
                  role={isAdmin}
                  key={index}
                ></Movie>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {newMovieAddError && (
        <p className="mb-4 text-sm text-red-600">{newMovieAddError}</p>
      )}
    </div>
  );
};

export default MovieList;
