import { useEffect, useState } from 'react'
import classes from './Home.module.css'
import ImageProfile from './ImageProfile';
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from '../generic/Button'
import api from '../../services/api';

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const settings = {
      infinite: true,
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 2000,
  };

  useEffect(() => {
    // Make GET request to fetch data
    axios
        .get("http://localhost:8000/shirts/get")
        .then((response) => {
            console.log(response);
            setData(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
  }, []);

  const tempdata = api();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.pageContainer}>
          <div className="tag">
              <h1>Clothes collection</h1>
          </div>
          <div className="imgslider">
              <Slider {...settings}>
                {tempdata.map((post) => (
                  <ImageProfile
                    id={post.id}
                    img_url={post.img_url}
                    name={post.name}
                    brand={post.brand}
                  />
                ))}
              </Slider>
          </div>
    </div>
  );
}

export default Home;