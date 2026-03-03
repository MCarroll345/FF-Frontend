import { useEffect, useState } from 'react'
import classes from './Home.module.css'
import ImageProfile from './ImageProfile';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from '../../services/api';

function Home() {
  const [shirts, setShirts] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [shoes, setShoes] = useState([]);
  const settings = {
      infinite: true,
      dots: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 2000,
  };

  useEffect(() => {
    fetchShirts();
    fetchDresses();
    fetchShoes();
  }, []);


  const fetchShirts = async () => {
    try {
      const data = await api('shirts');
      setShirts(data);
    } catch (e) {
      console.error("Error fetching shirts:", e);
      setShirts([]);
    }
  };

  const fetchDresses = async () => {
    try {
      const data = await api('dresses');
      setDresses(data);
    } catch (e) {
      console.error("Error fetching dresses:", e);
      setDresses([]);
    }
  };

  const fetchShoes = async () => {
    try {
      const data = await api('shoes');
      setShoes(data);
    } catch (e) {
      console.error("Error fetching shoes:", e);
      setShoes([]);
    }
  };

  return (
    <div className={classes.pageContainer}>
          <div className="tag">
              <h1>Shirts</h1>
          </div>
          <div className="imgslider">
              <Slider {...settings}>
                {shirts.map((post) => (
                  <ImageProfile
                    id={post.id}
                    img_url={post.img_url}
                    name={post.name}
                    brand={post.brand}
                  />
                ))}
              </Slider>
              <h1>Dresses</h1>
              <Slider {...settings}>
                {dresses.map((post) => (
                  <ImageProfile
                    id={post.id}
                    img_url={post.img_url}
                    name={post.name}
                    brand={post.brand}
                  />
                ))}
              </Slider>
              <h1>Shoes</h1>
              <Slider {...settings}>
                {shoes.map((post) => (
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
