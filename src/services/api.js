import { useEffect, useState } from 'react'
import axios from 'axios'

function api() {

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

    return data;
}

export default api;