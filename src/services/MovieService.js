import axios from "axios";

const MOVIE_API_BASE_URL = "http://localhost:8080/api/v1.0/moviebooking";

class MovieService {

  login(credentials) {
    return axios.post(MOVIE_API_BASE_URL + '/login', credentials);
  }

  register(register) {
    return axios.post(MOVIE_API_BASE_URL + '/register', register);
  }

  resetPassword(credentials,loginId) {
    return axios.put(MOVIE_API_BASE_URL + "/"+loginId+ '/forgot', credentials);
  }

  saveMovie(movie) {
    return axios.post(MOVIE_API_BASE_URL + '/addMovie', movie, {
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    });
  }

  getMovies() {
    return axios.get(MOVIE_API_BASE_URL + '/all');
  }

  getMoviesByMovieName(movieName) {
    return axios.get(MOVIE_API_BASE_URL + '/movies'+'/search/'+ movieName);
  }

  deleteMovie(movieName) {
    return axios.delete(MOVIE_API_BASE_URL +'/'+movieName+ '/delete',  {
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    });
  }

  updateMovie(movie, movieName) {
    return axios.put(MOVIE_API_BASE_URL + "/"+movieName+"/update", movie, {
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    });
  }

  bookMovieTicket(moviebook, movieName) {
    return axios.post(MOVIE_API_BASE_URL + "/"+movieName+"/add", moviebook,{
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    });
  }

  getTicketByLoginId(loginId){
    return axios.get(MOVIE_API_BASE_URL + "/tickets/"+loginId,{
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    });
  }

  updateTheater(movie, movieName, theaterName, ticket) {
    return axios.put(MOVIE_API_BASE_URL + "/" + movieName + "/" +theaterName + "/update"+ ticket);
  }
}

export default new MovieService();
