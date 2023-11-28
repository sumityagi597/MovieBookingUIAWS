import React, { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";
import BookedTicketDetails from "./BookedTicketDetails";



const BookedTickets = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await MovieService.getTicketByLoginId(sessionStorage.getItem("loginId"));
            setTickets(response.data);
          } catch (error) {
            console.log("catching");
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

  return (
    
    <div>
        <div className="flex justify-center">
            <h4 className="flex justify-center rounded mb-6 max-w-lg bg-slate-600 text-white px-6 py-2 mt-5 font-semibold">
                Congratulations {sessionStorage.getItem("loginId")}! Your Booking Confirmed
            </h4>
      </div>
        {!loading && (
          <div className="bg-white">
            {tickets.map((ticket) => (
                <BookedTicketDetails
                bookedTicket={ticket}
                ></BookedTicketDetails>
              ))}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/movieList")}
                className="rounded max-w-lg text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mx-auto"
              >
                Back
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default BookedTickets;
