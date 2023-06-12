import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginapi } from '../services/home_service';
import { toast,ToastContainer } from 'react-toastify';

const Login = () => {

  useEffect(()=>{
    document.title='Login'
  },[])

  // Properties
  const [credentials, setCredentials] = useState({});
  const navigate = useNavigate();

  // Login working
  const login = (e) => {
    console.log('I am under login handler')
    console.log(credentials);
    logInPost(credentials);
    e.preventDefault();
  }

  const logInPost = (data) => {
    loginapi(data).then(
      (response)=>{
        console.log(response.data);
        localStorage.setItem('token',response.data);
        // navigate('/dashboard')
        window.location.href='/dashboard'
      },
      (error)=>{
        console.log(error); 
        alert('Enter correct details'); 
        navigate('/login')}
      )
  }

  return (
    <div className='p-5'>
      <form onSubmit={login} className='mt-5 rounded shadow-lg p-4 col-6 mx-auto'>
        <h2>Login form</h2>
        <div className="mb-1 mt-4">
          <label htmlFor="email">Enter email</label>
          <input type="email" className='form-control' id='email' name='email' onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} />
        </div>
        <div className="mb-1 mt-4">
          <label htmlFor="password">Enter password</label>
          <input type="password" className='form-control' id='password' name='password' onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">Log in</button> 
          <button type="reset" className="btn btn-danger ms-1" data-bs-dismiss="modal">Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Login
