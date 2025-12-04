import { useEffect, useState } from 'react'
import classes from './Home.module.css'
import { Container, Box, Typography, Grid, Card, CardContent } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../generic/Button'

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.pageContainer}>
          {data.map((post) => (
              <li key={post.id}>{post.name} {post.brand}</li>
          ))}
    </div>
  );
}

export default Home;