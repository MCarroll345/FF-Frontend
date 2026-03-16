import { useState } from 'react';
import axios from 'axios';
import classes from '../../../styles/auth.module.css';

const MIN_ATTR = 4;

function normalizeImageSrc(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().replace(/^['"]+|['"]+$/g, '');
}

function LoginPage() {
  const [recommend, setRecommend] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const aws_recom = process.env.NEXT_PUBLIC_RECOM_AWS;

  const handleOptionToggle = (option) => {
    setSelectedOptions((previousSelections) => {
      if (previousSelections.includes(option)) {
        return previousSelections.filter((item) => item !== option);
      }

      if (previousSelections.length >= MIN_ATTR) {
        return previousSelections;
      }

      return [...previousSelections, option];
    });
  };

  const login = async () => {
    try {
      const response = await axios.post('user/login', {
        
      });
    } catch (error) {
      console.error('Error login in:', error);
      alert(error.response?.data?.detail || 'Network error logging in');
    }
  };

  const recommendationItems = [1, 2, 3, 4]
    .map((index) => {
      const name = recommend?.[`name${index}`];
      const image = normalizeImageSrc(
        recommend?.[`image${index}`]
        || recommend?.[`img_url${index}`]
        || recommend?.[`img${index}`]
        || recommend?.[`url${index}`]
      );

      if (!name && !image) {
        return null;
      }

      return {
        id: index,
        name: name || `Look ${index}`,
        image,
      };
    })
    .filter(Boolean);

  return (
    <div className={classes.container}>
      <h1>Login Page</h1>
      
    </div>
  );
}

export default LoginPage;
