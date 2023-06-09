import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Other from './components/Other';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Clients from './components/Clients';
import Projects from './components/Projects';
import TimeSheets from './components/TimeSheets';
import Employees from './components/Employees';
import Holidays from './components/Holidays';

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="sticky-top">
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/other' element={<Other/>} exact/>
        <Route path='/dashboard' element={<Dashboard/>} exact/>
        <Route path='/login' element={<Login/>} exact/>
        <Route path='/clients' element={<Clients/>} exact/>
        <Route path='/projects' element={<Projects/>} exact/>
        <Route path='/timesheets' element={<TimeSheets/>} exact/>
        <Route path='/employees' element={<Employees/>} exact/>
        <Route path='/holidays' element={<Holidays/>} exact/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
