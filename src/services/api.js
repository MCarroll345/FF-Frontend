const aws_clothes = 'localhost';

async function api(props) {
  const res = await fetch(`http://${aws_clothes}:8000/${props}/get`);
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    throw new Error((data && data.detail) || text);
  }

  return Array.isArray(data) ? data : [];
}

export default api;
