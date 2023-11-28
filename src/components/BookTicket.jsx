import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BookedTicketDetails from "./BookedTicketDetails";
import MovieService from "../services/MovieService";

const BookTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tmovie = location.state && location.state.movie;

  const [loading, setLoading] = useState(true);
  const [ticketbookError, setticketbookError] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [bookingDetailsError, setBookingDetailsError] = useState("");

  const [bookedTicket, setbookedTicket] = useState(null);

  const availableSeat = tmovie.noOfTicketsAvailable;

  const [moviebook, setMoviebook] = useState({
    movieName: tmovie.movieName,
    theaterName: tmovie.theaterName,
    noOfTickets: "",
    seatNumber: "",
    loginId:sessionStorage.getItem('loginId'),
  });

  const handleTicketChange = (event) => {
    const { name, value } = event.target;
    if (name === "seatNumber") {
      setMoviebook({ ...moviebook, [name]: value.split(",") });
    } else {
      setMoviebook({ ...moviebook, [name]: value });
    }
  };

  const verifybookingreq = (event) => {
    if (moviebook.noOfTickets < 1) {
      setticketbookError("please enter valid number of tickets to book");
      setHasErrors(true);
      return false;
    } else if (moviebook.noOfTickets > availableSeat) {
      setticketbookError("Sorry!! You can book only less than available Seat");
      setHasErrors(true);
      return false;
    } else if (moviebook.seatNumber.length > moviebook.noOfTickets) {
      setticketbookError("Selected seat numbers can not exceed no of tickets");
      setHasErrors(true);
      return false;
    } else if (moviebook.seatNumber.length === 0) {
      setticketbookError("Select seat numbers ");
      setHasErrors(true);
      return false;
    } else {
      setticketbookError("");
      setHasErrors(false);
      return true;
    }
  };

  const handleTicketBooking = (e) => {
    e.preventDefault();

    if (verifybookingreq(e)) {
      MovieService.bookMovieTicket(moviebook, moviebook.movieName)
        .then((response) => {
          setbookedTicket(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setticketbookError(error.response.data);
          if (error.response.data.message.includes("JWT expired"))
            setBookingDetailsError("Session Logged out please login again");
          else if (
            error.response.data.message.includes("Required request header")
          )
            setBookingDetailsError("You are not logged in, please login first");
          else {
            setBookingDetailsError("some error occur, contact Admin");
          }
        });
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto my-auto">
        <h2 className="flex justify-center text-4xl font-bold mb-4 mt-8">
          Book Movie Ticket
        </h2>
        {loading && (
          <form>
            <div className="flex mb-4">
              <label
                htmlFor="firstName"
                className="w-1/4 text-xl font-normal py-1 text-gray-700 "
              >
                Movie :
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={moviebook.movieName}
                readOnly
              />
            </div>
            <div className="flex mb-4">
              <label
                htmlFor="lastName"
                className="w-1/4 text-xl font-normal py-1 text-gray-700 "
              >
                Theater :
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={moviebook.theaterName}
                readOnly
              />
            </div>
            <div className="flex mb-4">
              <label
                htmlFor="availableSeat"
                className="w-1/4 text-xl font-normal py-1 text-gray-700 "
              >
                Available Seat :
              </label>
              <input
                id="availableSeat"
                name="availableSeat"
                type="text"
                autoComplete="email"
                required
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={availableSeat}
                readOnly
              />
            </div>
            <div className="flex mb-4">
              <label
                htmlFor="noOfTickets"
                className="w-1/4 text-xl font-normal py-1 text-gray-700 "
              >
                Tickets :
              </label>
              <input
                id="noOfTickets"
                type="tel"
                name="noOfTickets"
                required
                pattern="[0-9]{10}"
                maxLength={2}
                placeholder="Enter number of seat you want to book"
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={moviebook.noOfTickets}
                onChange={(e) => handleTicketChange(e)}
                //onBlur={(e) => verifybookingreq(e)}
              />
            </div>
            <div className="flex mb-4">
              <label
                htmlFor="numOfSeat"
                className="w-1/4 text-xl font-normal py-1 text-gray-700 "
              >
                SeatNumbers :
              </label>
              <input
                id="seatNumber"
                type="tel"
                name="seatNumber"
                required
                pattern="[A-Z]\d+"
                placeholder="Enter number of seat you want to book"
                className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={moviebook.seatNumber}
                onChange={(e) => {
                  handleTicketChange(e);
                }}
                
              />
            </div>
            {ticketbookError && (
              <p className="mt-2 text-sm text-red-600">{ticketbookError}</p>
            )}
            
            <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
              <button
                id="submitTicketRequest"
                onClick={(e) => {
                  handleTicketBooking(e);
                }}
                className="rounded mr-4 text-white font-semibold bg-blue-500 hover:bg-blue-800 py-2 px-6"
              >
                Book
              </button>
              <button
                onClick={() => navigate("/movieList")}
                className="rounded mt-8 max-w-lg text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mx-auto"
              >
                Home
              </button>
              {bookingDetailsError && (
                <p id ="errorText" className="mt-4 mb-4 text-sm text-red-600">
                  {bookingDetailsError}
                </p>
              )}
            </div>
            
          </form>
        )}
      </div>

      <div>
        {!loading && (
          <div className="bg-white">
            <BookedTicketDetails bookedTicket={moviebook}></BookedTicketDetails>

            <div className="flex justify-center">
              <button id="movieBookingButton"
                onClick={() => navigate("/movieList")}
                className="rounded max-w-lg text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mx-auto"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
