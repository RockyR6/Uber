import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return;
    }
  }, [token]);

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        setLoading(false);
      }
    })
    .catch((err) => {
      console.error("Error fetching user profile:", err);
      localStorage.removeItem("token");
      navigate("/user-login");
    });

  if(loading){
    return <div>Loading...</div>
  }
  return (<>{children}</>);
};

export default UserProtectWrapper;
