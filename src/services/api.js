import axios from 'axios';

const aws_clothes = 'localhost';

async function api(props) {
  try {
    const { data } = await axios.get(`http://${aws_clothes}:8000/${props}/get`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    const detail = error.response?.data?.detail;
    const message = typeof error.response?.data === 'string' ? error.response.data : error.message;
    throw new Error(detail || message);
  }
}

export default api;
