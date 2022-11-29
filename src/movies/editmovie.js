import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { read, updateMovie } from "../actions/movie";
import { useSelector } from "react-redux";
import MovieEditForm from "../components/forms/MovieEditForm";

const { Option } = Select;

const EditMovie = ({ match }) => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    seat: "",
  });
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  // destructuring variables from state
  const { title, content, price, from, to, seat, location } = values;

  useEffect(() => {
    loadSellerMovie();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.movieId);
    // console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/movie/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let movieData = new FormData();
    movieData.append("title", title);
    movieData.append("content", content);
    movieData.append("location", location);
    movieData.append("price", price);
    image && movieData.append("image", image);
    movieData.append("from", from);
    movieData.append("to", to);
    movieData.append("seat", seat);

    try {
      let res = await updateMovie(token, movieData, match.params.movieId);
      console.log("MOVIE UPDATE RES", res);
      toast.success(`${res.data.title} is updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Movie</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <MovieEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMovie;