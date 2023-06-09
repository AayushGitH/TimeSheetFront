import React, { useEffect, useState } from 'react';
import { getUserapi } from '../services/home_service';
import photo from '../images/admin.png';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Profile'
    getUserapi().then(
      (response) => {
        setUser(response.data);
        if (response.data.role == 'ROLE_ADMIN') {
          setAdmin(true);
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }, []);

  // Properties
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [employee, setEmployee] = useState({});

  // Add Employee function
  const addEmployee = (e) => {
    console.log('Under the add employee method');
    console.log(employee)
    e.preventDefault();
  }

  return (
    <div>
      <div className="mt-5 rounded container-fluid shadow-lg col-9 pt-5 pb-5">
        <div className="container-fluid d-flex justify-content-center">
          <div className="container-fluid text-center ">
            <img src={photo} alt="" style={{ width: 100 }} />
          </div>
        </div>

        {admin ? (<div className="container-fluid">
          <div className="mt-5 d-flex justify-content-center row">
            <h5 className='text-center'>Employee section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addEmployeeModal">Add employee</button>
            </div>
            <div className="row ms-2 col-6">
              <Link to='/employees' className='text-white btn btn-primary d-flex align-items-center justify-content-center rounded text-decoration-none'>View employees</Link>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>Project section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addProjectModal">Add project</button>
            </div>
            <div className="row ms-2 col-6">
              <Link to='/projects' className='text-white btn btn-primary d-flex align-items-center justify-content-center rounded text-decoration-none'>View projects</Link>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>Client section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addClientModal">Add client</button>
            </div>
            <div className="row ms-2 col-6">
              <Link to='/clients' className='text-white btn btn-primary d-flex align-items-center justify-content-center rounded text-decoration-none'>View clients</Link>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>Holiday section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addHolidayModal">Add holiday</button>
            </div>
            <div className="row ms-2 col-6">
              <Link to='/holidays' className='text-white btn btn-primary d-flex align-items-center justify-content-center rounded text-decoration-none'>View holidays</Link>
            </div>
          </div>
        </div>) : (<div className="container-fluid">
          <div className="mt-5 d-flex justify-content-center row">
            <h5 className='text-center'>Profile section</h5>
            <div className="row col-6">
              <button className='btn btn-secondary'>Edit employee</button>
            </div>
            <div className="row ms-2 col-6">
              <button className='btn btn-primary'>Edit employees</button>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>TimeSheet section</h5>
            <div className="row col-6">
              <button className='btn btn-secondary'>Add timesheet</button>
            </div>
            <div className="row ms-2 col-6">
              <button className='btn btn-danger'>View timesheets</button>
            </div>
          </div>
        </div>)}

        {/* Add Employee Modal */}
        <div className="modal fade" id="addEmployeeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row col-12 mb-1">
                    <div className="col-6">
                      <label htmlFor="name">Enter name</label>
                      <input type="text" className='form-control' id='name' name='name' onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }} required />
                    </div>
                    <div className="col-6">
                      <label htmlFor="password">Enter password</label>
                      <input type="text" className='form-control' id='password' name='password' onChange={(e) => { setEmployee({ ...employee, password: e.target.value }) }} />
                    </div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="email">Enter email</label>
                    <input type="email" className='form-control' id='email' name='email' onChange={(e) => { setEmployee({ ...employee, email: e.target.value }) }} />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="address">Enter address</label>
                    <input type="text" className='form-control' id='address' name='address' onChange={(e) => { setEmployee({ ...employee, address: e.target.value }) }} />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="contact">Enter contact</label>
                    <input type="text" className='form-control' id='contact' name='contact' onChange={(e) => { setEmployee({ ...employee, contact: e.target.value }) }} />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="department">Enter department</label>
                    <input type="text" className='form-control' id='department' name='department' onChange={(e) => { setEmployee({ ...employee, department: e.target.value }) }} />
                  </div>
                  <div className="row col-12 mb-1">
                    <div className="col-6">
                      <label htmlFor="gender">Enter gender</label>
                      <input type="text" className='form-control' id='gender' name='gender' onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }} />
                    </div>
                    <div className="col-6">
                      <label htmlFor="role">Enter role</label>
                      <input type="text" className='form-control' id='role' name='role' onChange={(e) => { setEmployee({ ...employee, role: e.target.value }) }} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addEmployee} data-bs-dismiss="modal">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Add project Modal */}
        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h1>Under implementation</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Add Client Modal */}
        <div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h1>Under implementation</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Add Holiday Modal */}
        <div className="modal fade" id="addHolidayModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Holiday</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h1>Under implementation</h1>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
