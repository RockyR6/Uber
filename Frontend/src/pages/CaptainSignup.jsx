import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
       <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base mb-2 font-medium">Captain's name</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-sm"
              placeholder="First Name"
              required
              type="text"
            />
            <input
              value={lastName}
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
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
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

export default CaptainSignup;
