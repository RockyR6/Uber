import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import {UserDataContext} from "../context/UserContext";

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext)

  

  const submitHandler = async(e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);

  if (response.status === 200) {
    const data = response.data
    setUser(data.user)
    localStorage.setItem('token', data.token)
    navigate("/home")
  }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
          <input 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className='bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
          placeholder='email@example.com'
          required
          type="email" />
          <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
          <input 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className='bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
          type="password" 
          placeholder='password'/>
          <button className='w-full bg-black text-white py-2 px-4 mb-2 rounded mt-5'>Login</button>
        </form>
          <p className='text-center'>New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className='flex items-center justify-center w-full bg-[#10b461] text-white py-3 rounded mt-5'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
