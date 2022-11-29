import { useState, useEffect } from "react";
import { allmovies } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadAllMovies();
  }, []);

  const loadAllhotels = async () => {
    let res = await allMovies();
    setMovies(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Movies</h1>
      </div>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {movies.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;