import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import GlobalContext from "./store/globalContext";
import axios from 'axios';
import ImageProfile from '../components/layout/ImageProfile';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
};

function HomePage() {
    const globalCtx = useContext(GlobalContext);
    const router = useRouter();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/recom/shirts/get')
            .then(({ data }) => setItems(data))
            .catch(() => setItems([]));
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {/* Blurred scrolling background */}
            <div style={{ position: 'absolute', inset: 0, filter: 'blur(6px)', transform: 'scale(1.05)', pointerEvents: 'none' }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{ marginBottom: '1rem' }}>
                        <Slider {...sliderSettings}>
                            {items.map((post) => (
                                <ImageProfile key={post.id} id={post.id} img_url={post.img_url} name={post.name} brand={post.brand} />
                            ))}
                        </Slider>
                    </div>
                ))}
            </div>

            {/* Welcome overlay */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1rem' }}>
                <div style={{ background: 'rgba(245,224,245,0.9)', borderRadius: '12px', padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem)', textAlign: 'center', boxShadow: '0 8px 32px rgba(180,80,180,0.2)', border: '1px solid rgba(196,122,196,0.3)', width: '100%', maxWidth: '480px' }}>
                    <img src="/FF-png-notxt.png" alt="FitFinder" style={{ maxWidth: '200px', marginBottom: '1rem' }} />
                    <h1 style={{ color: '#7a3d7a', marginBottom: '0.5rem' }}>Welcome to Fit Finder</h1>
                    {!globalCtx.theGlobalObject.username && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                onClick={() => router.push('/auth/login')}
                                style={{ margin: '0 0.5rem', padding: '0.75rem 2rem', fontSize: '1rem', backgroundColor: '#c47ac4', color: 'white', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push('/auth/register')}
                                style={{ margin: '0 0.5rem', padding: '0.75rem 2rem', fontSize: '1rem', backgroundColor: 'transparent', color: '#9b4f9b', fontWeight: '600', border: '1.5px solid rgba(196,122,196,0.5)', borderRadius: '6px', cursor: 'pointer' }}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;