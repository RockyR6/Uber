import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({
      email: email,
      password: password
    })
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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
          <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/user-login' className='flex items-center justify-center w-full bg-orange-400 text-white py-3 rounded mt-5'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default UserLogin
