import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(logOut())
    navigate('/')
    
  };

  return (
    <div>
      <div className='flex justify-end '>
        <Link to='/CreatePost'>Create Post</Link>
      <button onClick={handleLogOut} className='px-4 py-1 mt-5 mr-4 bg-black text-red-500'>
        Log Out
      </button>
      </div>
      <div>
      <h1 className='mt-16 flex justify-center'>Welcome to your Dashboard</h1>
      
      </div>
    </div>
  );
};

export default Dashboard;
