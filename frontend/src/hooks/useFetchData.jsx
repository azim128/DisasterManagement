import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { apiUrl } from "../config/variables";

const useFetchData = (endpoint, params,headers={}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching data from:", `${apiUrl}${endpoint}`);
      console.log("With params:", params);
      const response = await axios.get(`${apiUrl}${endpoint}`, { params,headers });
      console.log("Response:", response);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error in useFetchData:", err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;