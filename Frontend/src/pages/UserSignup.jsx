import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserSignup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base mb-2 font-medium">What's your Name</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-sm"
              placeholder="First Name"
              required
              type="text"
            />
            <input
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-sm"
              placeholder="Last Name"
              required
              type="text"
            />
          </div>

          <h3 className="text-lg  font-medium">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            placeholder="email@example.com"
            required
            type="email"
          />
          <h3 className="text-lg mb-5 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            type="password"
            placeholder="password"
          />
          <button className="w-full bg-black text-white py-2 px-4 mb-2 rounded mt-5">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/user-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
