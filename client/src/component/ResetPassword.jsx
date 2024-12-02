import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/authSlice';



const ResetPassword = () => {
  const [newPassword, setNewPassword ] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');
  const [localError, setLocalError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();  

  const token = new URLSearchParams(location.search).get('token');
  const {loading, resetPasswordStatus, error} = useSelector(state => state.auth)
 
  const handleSubmit = async (e) =>{
  e.preventDefault();  

  
  dispatch(resetPassword({token, newPassword, confirmPassword}))
  };

  useEffect(()=>{
    if(resetPasswordStatus === 'success'){
      alert('Password has been reset successfully')
      navigate('/dashboard')
    }
  
  
  },[resetPasswordStatus, navigate])
  
  return (
  <div className='flex justify-center'>
      <div className='w-full max-w-96 p-8 mt-10 bg-slate-300 '>
        <h1 className='text-xl py-4 font-bold'>RESET PASSWORD</h1>
      <form  className='flex flex-col gap-4'onSubmit={handleSubmit}>
          <input type="password" placeholder='Password'  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='p-2 border-black'/>
          <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='p-2 border-black'/>
          <button type='submit' className='px-4 py-2 bg-red-500 '>
            {loading? 'Loading.....' : 'Reset Password'}
            </button>
            {localError && <p className='text-rose-500'>{localError}</p>}
            {resetPasswordStatus === 'failed' && (<p className='text-rose-500'>{error.message || 'An error occurred. Please try again.'}</p>)}
      </form>
      
  </div>
  </div>
  )
  }

export default ResetPassword