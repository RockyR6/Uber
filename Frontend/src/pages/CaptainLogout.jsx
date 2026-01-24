import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("token");
        navigate("/captain-login");
      } catch (err) {
        console.error("Logout error:", err.response?.data);
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    logout();
  }, []);

  return (
    <div>
      Captain Logging out...
    </div>
  )
}

export default CaptainLogout
