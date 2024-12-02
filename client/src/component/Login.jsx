import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../redux/authSlice';


const Login = () => {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector((state ) => state.auth)
  const auth = useSelector((state ) => state.auth)
    const navigate = useNavigate()
    // const [error, setError] = useState('')
  const [inputs, setInputs ] = useState({
    username: '', 
    password: ''
})

const handleChange = (e) =>{
    setInputs({...inputs, [e.target.name]: e.target.value,})
    
}
const handleSubmit = async (e) =>{
  e.preventDefault();
  await dispatch(login(inputs)).then((result) =>{
    if(result.meta.requestStatus === "fulfilled"){
      alert('Logged in successfully');
      navigate('/')
    }
  })

  
}

return (
<div className='flex justify-center px-4'>
    <div className='w-full max-w-md p-8 mt-10 bg-slate-300 rounded-lg shadow-md'>
      <h1 className='text-xl py-4 font-bold'>LOGIN</h1>
    <form action="" className='flex flex-col gap-4'onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' name='username' onChange={handleChange} className='p-2 border border-black rounded'/>
        <input type="password" placeholder='Password' name='password' onChange={handleChange} className='p-2 border border-black rounded'/>
        <button type='submit' className='px-4 py-2 bg-red-500 ' disabled={isLoading}>{isLoading ? 'Logging In .....' : 'Login'}</button>
        <div className="flex justify-between items-center">
        <Link to='/forgotPassword'>Forgot Password</Link>
        <Link to='/register' className='text-blue-900 font-semibold'>Sign Up</Link>
        </div>
        {error && <p style={{ color: "red" }}>{error.message || "An error occurred"}</p>}
    </form>
    
</div>
</div>
)
}

export default Login