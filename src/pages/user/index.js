import { useState } from 'react';
import axios from 'axios';
import classes from '../../styles/recom.module.css';

const ATTR_LIST = [
  'light',
  'dark',
  'bright',
  'warm',
  'cool',
  'lightweight',
  'fancy',
  'casual',
  'business',
  'lounge',
  'evening',
  'minimalist',
  'vintage',
  'modern',
  'soft',
  'comfortable',
  'layerable',
];

const MIN_ATTR = 4;

function normalizeImageSrc(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().replace(/^['"]+|['"]+$/g, '');
}

function UserPage() {
  const [recommend, setRecommend] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const aws_recom = process.env.NEXT_PUBLIC_RECOM_AWS;

  const userDets = async () => {
        try {
            await axios.post(`/user/users/${userId}`)
        } catch (error) {
            console.error('Logout error:', error)
        }
        setGlobals(prev => ({ ...prev, username: null }))
    }

  return (
    <div className={classes.container}>
      <h1>Outfit Ideas</h1>
      
    </div>
  );
}

export default UserPage;
