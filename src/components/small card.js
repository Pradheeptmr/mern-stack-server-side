import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handlemovieDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {m.image && m.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/movie/image/${h._id}`}
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
                {h.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price * 100,
                    currency: "inr",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{m.location}</p>
              <p className="card-text">{`${m.content.substring(1, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(m.from, m.to)}{" "}
                  {diffDays(m.from, m.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{m.seat} seat</p>
              <p className="card-text">
                Available from {new Date(m.from).toLocaleDateString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/movie/${m._id}`)}
                    className="btn btn-primary"
                  >
                    Show more
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/movie/edit/${h._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handlemovieDelete(m._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;