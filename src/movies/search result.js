import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../components/forms/Search";
import { searchListings } from "../actions/movie";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
  // state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchseat, setSearchSeat] = useState("");
  const [movie, setMovies] = useState([]);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, date, seat } = queryString.parse(window.location.search);
    // console.table({ location, date, bed });
    searchListings({ location, date, seat }).then((res) => {
      console.log("SEARCH RESULTS ===>", res.data);
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((m) => (
            <SmallCard key={m._id} h={h} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
