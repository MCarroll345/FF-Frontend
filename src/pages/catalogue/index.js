import { useEffect, useState } from 'react'
import axios from 'axios';
import classes from '../../components/layout/Home.module.css'
import ImageProfile from '../../components/layout/ImageProfile';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArrowBtn = ({ onClick, direction }) => (
  <button onClick={onClick} style={{
    position: 'absolute',
    [direction === 'left' ? 'left' : 'right']: '-1.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    background: 'white',
    border: '1.5px solid rgba(196,122,196,0.4)',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9b4f9b',
    fontSize: '1rem',
    boxShadow: '0 2px 6px rgba(180,80,180,0.15)',
  }}>
    {direction === 'left' ? '‹' : '›'}
  </button>
);

function Home() {
  const [shirts, setShirts] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [shoes, setShoes] = useState([]);

  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    lazyLoad: true,
    prevArrow: <ArrowBtn direction="left" />,
    nextArrow: <ArrowBtn direction="right" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640,  settings: { slidesToShow: 2 } },
    ],
  };

  useEffect(() => {
    fetchShirts();
    fetchDresses();
    fetchShoes();
  }, []);

  const fetchShirts = async () => {
    try { const { data } = await axios.get(`/recom/shirts/get`); setShirts(data); }
    catch (e) { setShirts([]); }
  };

  const fetchDresses = async () => {
    try { const { data } = await axios.get(`/recom/dresses/get`); setDresses(data); }
    catch (e) { setDresses([]); }
  };

  const fetchShoes = async () => {
    try { const { data } = await axios.get(`/recom/shoes/get`); setShoes(data); }
    catch (e) { setShoes([]); }
  };

  const Section = ({ title, items }) => (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ color: '#7a3d7a', marginBottom: '1rem' }}>{title}</h2>
      <div style={{ position: 'relative', padding: '0 1.5rem' }}>
        <Slider {...settings}>
          {items.map((post) => (
            <ImageProfile key={post.id} id={post.id} img_url={post.img_url} name={post.name} brand={post.brand} />
          ))}
        </Slider>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '2rem 3rem' }}>
      <Section title="Shirts" items={shirts} />
      <Section title="Dresses" items={dresses} />
      <Section title="Shoes" items={shoes} />
    </div>
  );
}

export default Home;
