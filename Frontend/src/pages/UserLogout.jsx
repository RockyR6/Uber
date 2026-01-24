import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("token");
        navigate("/user-login");
      } catch (err) {
        console.error("Logout error:", err.response?.data);
        localStorage.removeItem("token");
        navigate("/user-login");
      }
    };

    logout();
  }, []);

  return <h2>Logging out...</h2>;
};

export default UserLogout;
