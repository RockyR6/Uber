import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setCaptain(res.data.captain);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.error("Error fetching captain profile:", err);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });

  if(isLoading){
    return <div>Loading...</div>
  }
  return (<>{children}</>);
};

export default CaptainProtectWrapper;