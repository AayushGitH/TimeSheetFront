import React, { useEffect, useState } from 'react'
import { assignProjectapi, getEmployeesapi, getProjectsapi, updateEmployeesapi } from '../services/admin_service'
import { Link, useNavigate } from 'react-router-dom'
import nodata from '../images/nodata.jpg';

const Employees = () => {

  useEffect(() => {
    getProjectsapi().then((response) => { setProjects(response.data) }, (error) => { console.log(error) })
    getEmployeesapi().then(
      (response) => {
        console.log(response.data)
        setEmployees(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  // Properties
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editEmployee, setEditEmployee] = useState({});
  const [assignData, setAssignData] = useState([]);
  const navigate = useNavigate();

  // Edit Click method
  const onEditClick = (event, index) => {
    console.log('The index is this ', index)
    setEditEmployee(employees[index]);
  }

  // Update Click method
  const onUpdateClick = () => {
    console.log(editEmployee);
    updateEmployeesapi(editEmployee).then(
      (response) => {
        console.log(response.data);
        // navigate('/employees')
        window.location.href = '/employees'
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Assign Click method
  const onAssignClick = (event, index) => {
    setAssignData({
      empId: employees[index].empId
    })
  }

  // Assigning project
  const assignProject = () => {
    assignProjectapi(assignData).then((response) => {
      console.log(response)
      // navigate('/employees')
      window.location.href = '/employees'
    },
      (error) => {
        console.log(error)
      })
  }

  return (
    <div className='mt-5'>
      <div className="container-fluid p-5">
        <table className="table table-sm table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Department</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          {employees.length > 0 ? employees.map((item, index) => (
            <tbody>
              <tr>
                <th scope="row" key={item.id}>
                  TSMP{item.empId}EMP2023
                </th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.department}</td>
                <td>{item.address}</td>
                <td>{item.status}</td>
                <td className='d-flex justify-content-center'>
                  <button className='btn btn-outline-primary btn-sm me-2' key={item.id} onClick={(e) => { onEditClick(e, index) }} data-bs-toggle="modal" data-bs-target="#updateEmployeeModal">Update</button>
                  {item.status == 'Inactive' ?
                    <button className='btn btn-warning btn-sm' onClick={(e) => { onAssignClick(e, index) }} data-bs-toggle="modal" data-bs-target="#assignProjectModal">Assign project</button>
                    : <button className='btn btn-secondary btn-sm' disabled>Already assigned</button>
                  }
                </td>
              </tr>

            </tbody>
          )) : <tbody className="text-center">
            <tr>
              <td>
                <img src={nodata} alt="Description Here" className="img-fluid" />
              </td>
            </tr>
          </tbody>}
        </table>
      </div>

      {/* Update Employee Modal */}
      <div className="modal fade" id="updateEmployeeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row col-12 mb-1">
                  <div className="col-12">
                    <label htmlFor="name">Enter name</label>
                    <input type="text" className='form-control' id='name' name='name' value={editEmployee.name} onChange={(e) => { setEditEmployee({ ...editEmployee, name: e.target.value }) }} />
                  </div>
                  <div className="mb">
                    <input type="text" className='form-control' id='password' hidden name='password' value={editEmployee.password} onChange={(e) => { setEditEmployee({ ...editEmployee, password: e.target.value }) }} />
                  </div>
                </div>
                <div className="mb-1">
                  <label htmlFor="email">Enter email</label>
                  <input type="email" className='form-control' id='email' placeholder='e.g.- aayush@test.com' name='email' value={editEmployee.email} onChange={(e) => { setEditEmployee({ ...editEmployee, email: e.target.value }) }} />
                </div>
                <div className="mb-1">
                  <label htmlFor="address">Enter address</label>
                  <input type="text" className='form-control' id='address' name='address' value={editEmployee.address} onChange={(e) => { setEditEmployee({ ...editEmployee, address: e.target.value }) }} />
                </div>
                <div className="mb-1">
                  <label htmlFor="contact">Enter contact</label>
                  <input type="text" className='form-control' id='contact' name='contact' value={editEmployee.contact} onChange={(e) => { setEditEmployee({ ...editEmployee, contact: e.target.value }) }} />
                </div>
                <div className="row">
                  <div className="mb-1 col-6">
                    <label htmlFor="department">Enter department</label>
                    <input type="text" className='form-control' disabled id='department' name='department' value={editEmployee.department} onChange={(e) => { setEditEmployee({ ...editEmployee, department: e.target.value }) }} />
                    <select name="department" className='col-12 text-center border border-1 pt-1 pb-1' id="department" onClick={(e) => { setEditEmployee({ ...editEmployee, department: e.target.value }) }}>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-1 col-6">
                    <label htmlFor="status">Enter status</label>
                    <input type="text" className='form-control' disabled id='status' name='status' value={editEmployee.status} />
                    <select name="status" className='col-12 text-center border border-1 pt-1 pb-1' id="status" onClick={(e) => { setEditEmployee({ ...editEmployee, status: e.target.value }) }}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mb-1">
                  <label htmlFor="gender">Enter gender</label>
                  <input type="text" disabled className='form-control' id='gender' name='gender' value={editEmployee.gender + ' (already selected)'} />
                  <select name="gender" className='col-12 text-center border border-1 pt-1 pb-1' id="gender" onClick={(e) => { setEditEmployee({ ...editEmployee, gender: e.target.value }) }}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onUpdateClick}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Client Modal */}
      <div className="modal fade" id="assignProjectModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Assign Project</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-1">
                  <label htmlFor="empId">Employee id</label>
                  <input type="number" className='form-control' id='empId' name='empId' value={assignData.empId} disabled onChange={(e) => { setAssignData({ ...assignData, projectId: e.target.value }) }} />
                </div>
                <div className="mb-1">
                  <label htmlFor="projectId">Present Projects</label>
                  <select name="projectId" type="select" className='col-12 text-center border border-1 pt-1 pb-1' onChange={(e) => { setAssignData({ ...assignData, projectId: e.target.value }) }} id="projectId">
                    <option value={0} >--Select Project--</option>
                    {

                      projects.map((opts) => (
                        <option value={opts.projectId} key={opts.projectId}>
                          {"Client :-" + opts.projectName}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={assignProject} data-bs-dismiss="modal">Assign</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employees
