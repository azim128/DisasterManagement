import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../config/variables';

const useVolunteers = (initialQueryParams, token) => {
  const [data, setData] = useState({ users: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryParams, setQueryParams] = useState(initialQueryParams);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/admin/users`, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [queryParams, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateQueryParams = useCallback((newParams) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...newParams,
      page: newParams.page || 1, // Reset to page 1 when other params change
    }));
  }, []);

  return { data, loading, error, updateQueryParams, refetch: fetchData };
};

export default useVolunteers;