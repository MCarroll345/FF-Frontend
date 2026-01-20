import { useEffect, useState } from 'react'
import classes from './Home.module.css'
import ImageProfile from './ImageProfile';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const aws_clothes = "ac88076883d004ce280d5f74a11363c1-321421777.eu-west-1.elb.amazonaws.com"
  const [clothes, setClothes] = useState([]);
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
    fetchClothes();
  }, []);


  const fetchClothes = async () => {
    try {
      const res = await fetch(
        `http://${aws_clothes}:8000/shirts/get`
      );

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) throw new Error(data.detail || text);

      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching clothes:", e);
      setClothes([]);
    }
  };

  return (
    <div className={classes.pageContainer}>
          <div className="tag">
              <h1>Clothes collection</h1>
          </div>
          <div className="imgslider">
              <Slider {...settings}>
                {clothes.map((post) => (
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