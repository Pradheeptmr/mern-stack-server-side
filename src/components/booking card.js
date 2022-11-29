import { useState } from "react";
import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import OrderModal from "../modals/OrderModal";

const BookingCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {movie.image && movie.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/movie/image/${movie._id}`}
                alt="default movie image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default movie image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {movie.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: movie.price * 100,
                    currency: "inr",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{movie.location}</p>
              <p className="card-text">{`${movie.content.substring(
                1,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(movie.from, movie.to)}{" "}
                  {diffDays(movie.from, movie.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{movie.seat} seat</p>
              <p className="card-text">
                Available from {new Date(movie.from).toLocaleDateString()}
              </p>

              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary"
                >
                  Show Payment info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;