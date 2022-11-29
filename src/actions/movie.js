import axios from "axios";

export const createmovies = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-movie`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allmovies = async () =>
  await axios.get(`${process.env.REACT_APP_API}/allmovies`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellermovies = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletemovies = async (token, hotelId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-movie/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (movieId) =>
  await axios.get(`${process.env.REACT_APP_API}/movie/${movieId}`);

export const updatemovie = async (token, data, movieId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-movie/${movieId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const usermovieBookings = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-movie-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const isAlreadyBooked = async (token, movieId) =>
  await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const searchListings = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);