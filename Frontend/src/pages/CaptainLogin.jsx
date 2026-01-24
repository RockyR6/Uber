import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'


const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [ captain, setCaptain ] = useState('');

  const navigate = useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault()
    const CaptainLoginData = { email, password }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, CaptainLoginData)

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={submitHandler}>
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
          <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/user-login' className='flex items-center justify-center w-full bg-orange-400 text-white py-3 rounded mt-5'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
