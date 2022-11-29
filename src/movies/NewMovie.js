import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { createMovie } from "../actions/movie";
import { useSelector } from "react-redux";
import MovieCreateForm from "../components/forms/MovieCreateForm";

const { Option } = Select;

const NewHotel = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    seat: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  // destructuring variables from state
  const { title, content, image, price, from, to, seat } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    let movieData = new FormData();
    movieData.append("title", title);
    movieData.append("content", content);
    movieData.append("location", location);
    movieData.append("price", price);
    image && movieData.append("image", image);
    movieData.append("from", from);
    movieData.append("to", to);
    movieData.append("seat", seat);

    console.log([...movieData]);

    try {
      let res = await createMovie(token, hotelData);
      console.log("MOVIE CREATE RES", res);
      toast.success("New movie is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Movie</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <MovieCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(location)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewMovie;