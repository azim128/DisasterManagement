import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../config/variables";

const useDonation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createDonation = async (amount, donarName, donarEmail) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${apiUrl}/api/v1/donation/create`, {
        amount,
        donar_name: donarName,
        donar_email: donarEmail,
      });

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { createDonation, loading, error, success };
};

export default useDonation;
