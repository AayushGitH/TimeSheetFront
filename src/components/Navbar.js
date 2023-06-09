import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    // Properties
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
            setLoggedIn(true)
        }
    },[])

    const logout = () => {
        localStorage.removeItem('token');
        // navigate('/')
        window.location.href='/'
    }

    return (
        <div>
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-1 pb-1">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">TimeSheet</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#" to='/other'>Other</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Services
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#" to='/'>Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#" to='/dashboard'>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
                            </li>
                        </ul>
                        

                    </div>
                </div>
            </nav>
            </div>
                        
        </div>
    )
}

export default Navbar
