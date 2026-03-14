import { useEffect, useState } from 'react'
import axios from 'axios';
import classes from '../../components/layout/Home.module.css'
import ImageProfile from '../../components/layout/ImageProfile';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [shirts, setShirts] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [shoes, setShoes] = useState([]);
  const awsClothes = process.env.NEXT_PUBLIC_RECOM_AWS;
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
      const { data } = await axios.get(`${awsClothes}/shirts/get`);
      setShirts(data);
    } catch (e) {
      console.error("Error fetching shirts:", e);
      setShirts([]);
    }
  };

  const fetchDresses = async () => {
    try {
      const { data } = await axios.get(`${awsClothes}/dresses/get`);
      setDresses(data);
    } catch (e) {
      console.error("Error fetching dresses:", e);
      setDresses([]);
    }
  };

  const fetchShoes = async () => {
    try {
      const { data } = await axios.get(`${awsClothes}/shoes/get`);
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
