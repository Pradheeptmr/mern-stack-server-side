import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerMovies, deleteMovie } from "../actions/movie";
import { toast } from "react-toastify";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellersMovies();
  }, []);

  const loadSellersMovies = async () => {
    let { data } = await sellerMovies(auth.token);
    setHotels(data);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); // get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }
  };

  const handleMovieDelete = async (movieId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteMovie(auth.token, movieId).then((res) => {
      toast.success("Movie Deleted");
      loadSellersMovies();
    });
  };

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Movies</h2>
        </div>
        <div className="col-md-2">
          <Link to="/movies/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>

      <div className="row">
        {movies.map((m) => (
          <SmallCard
            key={m._id}
            h={m}
            showViewMoreButton={false}
            owner={true}
            handleMovieDelete={handleMovieDelete}
          />
        ))}
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post movie </h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </>
  );
};

export default DashboardSeller;