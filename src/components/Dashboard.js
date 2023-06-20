import React, { useEffect, useState } from 'react';
import { checkHolidayapi, getUserapi } from '../services/home_service';
import photo from '../images/admin.png';
import { Link, useNavigate } from 'react-router-dom';
import { addEmployeeapi, addProjectapi, addClientapi, addHolidayapi } from '../services/admin_service';
import { addTimeSheetapi } from '../services/employee_service';

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Profile'

    // Current date
    let tdate = new Date();
    let tda = tdate.getDate();
    let tmo = String(tdate.getMonth() + 1).padStart(2, '0');
    let tye = tdate.getFullYear();
    let currentDate = `${tye}-${tmo}-${tda}`;
    console.log('Current date is ', currentDate)
    setCDate(currentDate);

    // Checking holiday
    checkHolidayapi(currentDate).then(
      (response) => {
        console.log('The response for the holiday api is ', response.data)
        if (response.data == true) {
          setHolidayEnabled(true);
        }
      },
      (error) => {
        console.log(error)
      }
    )

    // Checking whether today is Sat or Sun
    const d = new Date();
    let day = d.getDay();
    console.log(`Today's day is `, day)
    if (day != 6 || day != 0) {
      setEnabled(true);
      console.log('I am not Saturday or Sunday')
    }

    // User Details fetch api call
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

  // Disabled Date method
  const disabledDate = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }

  // Properties
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [employee, setEmployee] = useState({});
  const [project, setProject] = useState({});
  const [client, setClient] = useState({});
  const [holiday, setHoliday] = useState({});
  const [timeSheet, setTimeSheet] = useState({});
  const [currentDate, setCDate] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [holidayEnabled, setHolidayEnabled] = useState(false);
  const navigate = useNavigate();

  // Add Employee method
  const addEmployee = (e) => {
    console.log('Under the add employee method');
    console.log(employee)
    addEmployeeapi(employee).then(
      (response) => {
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
    e.preventDefault();
  }

  // Add Project method
  const addProject = (e) => {
    addProjectapi(project).then(
      (response) => {
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
    e.preventDefault();
  }

  // Add Client method
  const addClient = (e) => {
    addClientapi(client).then(
      (response) => {
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
    e.preventDefault();
  }

  // Add Holiday method
  const addHoliday = (e) => {
    addHolidayapi(holiday).then(
      (response) => {
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
    e.preventDefault();
  }

  // Add TimeSheet method
  const addTimeSheet = (e) => {
    addTimeSheetapi(timeSheet).then(
      (response) => {
        console.log(response.data)
        setEnabled(false);
      },
      (error) => {
        console.log(error)
      }
    )
    console.log(timeSheet)
    e.preventDefault();
  }


  // View Employees method
  const viewEmployees = () => {
    // window.location.href='/employees'
    navigate('/employees')
  }

  // View Projects method
  const viewProjects = () => {
    navigate('/projects')
  }

  // View Clients method
  const viewClients = () => {
    navigate('/clients')
  }

  // View Holidays method
  const viewHolidays = () => {
    navigate('/holidays')
  }

  // View TimeSheets method
  const viewTimeSheets = () => {
    navigate('/timeSheets')
  }

  const logOut = () => {
    localStorage.removeItem('token');
    // navigate('/')
    window.location.href = '/'
  }

  return (
    <div>
      <div className="mt-5 mb-5 rounded container-fluid shadow-lg col-9 pt-5 pb-5">
        <div className="container-fluid d-flex justify-content-center">
          <div className="container-fluid text-center ">
            <img src={photo} alt="" style={{ width: 100 }} className='border border-2 border-dark rounded' />
          </div>
        </div>
        <div className="mt-4 container-fluid text-center">
          <div className="row fs-5 font-monospace fw-bold d-flex justify-content-center">
            {user.name}
          </div>
          <div className="row rounded col-8 mx-auto d-flex justify-content-center shadow-lg">
            <div className="row mt-2 d-flex justify-content-center">
              <div className="col-3 bg-warning">
                Email
              </div>
              <div className="col-9 bg-danger text-white fw-bold">
                {user.email}
              </div>
            </div>
            <div className="row mt-1 d-flex justify-content-center">
              <div className="col-3 bg-danger text-white">
                Address
              </div>
              <div className="col-9 bg-warning">
                {user.address}
              </div>
            </div>
            <div className="row mt-1 d-flex justify-content-center">
              <div className="col-3 bg-warning">
                Company Id
              </div>
              <div className="col-9 bg-danger text-white fw-bold">
                NT{user.empId}EMP2023
              </div>
            </div>
            <div className="row mt-1 d-flex justify-content-center">
              <div className="col-3 bg-danger text-white">
                Contact
              </div>
              <div className="col-9 bg-warning">
                {user.contact}
              </div>
            </div>
            <div className="row mt-1 mb-2 d-flex justify-content-center">
              <div className="col-3 bg-warning">
                Department
              </div>
              <div className="col-9 bg-danger text-white fw-bold">
                {user.department}
              </div>
            </div>
            <div className="row mb-2 d-flex justify-content-center">
              <button className='btn btn-danger' onClick={logOut}>Logout</button>
            </div>
          </div>
        </div>

        {admin ? (<div className="container-fluid">
          <div className="mt-5 d-flex justify-content-center row">
            <h5 className='text-center'>Employee section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addEmployeeModal">Add employee</button>
            </div>
            <div className="row ms-2 col-6">
              <button className='btn btn-primary' onClick={viewEmployees}>View employees</button>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>Project section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addProjectModal">Add project</button>
            </div>
            <div className="row ms-2 col-6">
              <button to='/employees' className='btn btn-primary' onClick={viewProjects}>View projects</button>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>Client section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addClientModal">Add client</button>
            </div>
            <div className="row ms-2 col-6">
              <button to='/employees' className='btn btn-primary' onClick={viewClients}>View clients</button>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>Holiday section</h5>
            <div className="row col-6">
              <button type='button' className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addHolidayModal">Add holiday</button>
            </div>
            <div className="row ms-2 col-6">
              <button to='/employees' className='btn btn-primary' onClick={viewHolidays}>View holidays</button>
            </div>
          </div>
        </div>) : (<div className="container-fluid">
          <div className="mt-5 d-flex justify-content-center row">
            <h5 className='text-center'>Profile section</h5>
            <div className="row col-12">
              <button className='btn btn-secondary'>Edit profile</button>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-center row">
            <h5 className='text-center'>TimeSheet section</h5>
            {enabled ? (<div className="row col-6">
              <button className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#addTimeSheetModal">Add TimeSheet</button>
            </div>) : (<div className="row col-6">
              <button className='btn btn-danger' disabled >Add TimeSheet</button>
            </div>)}

            <div className="row ms-1 col-6">
              <button className='btn btn-success' onClick={viewTimeSheets}>View timesheets</button>
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
                      <input type="text" required={true} className='form-control' id='name' name='name' onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }}/>
                    </div>
                    <div className="col-6">
                      <label htmlFor="password">Enter password</label>
                      <input type="text" className='form-control' id='password' name='password' onChange={(e) => { setEmployee({ ...employee, password: e.target.value }) }} />
                    </div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="email">Enter email</label>
                    <input type="email" className='form-control' id='email' placeholder='e.g.- aayush@test.com' name='email' onChange={(e) => { setEmployee({ ...employee, email: e.target.value }) }} />
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
                    {/* <input type="text" className='form-control' id='department' name='department' onChange={(e) => { setEmployee({ ...employee, department: e.target.value }) }} /> */}
                    <select name="department" className='col-12 text-center border border-1 pt-1 pb-1' id="department" onClick={(e) => { setEmployee({ ...employee, department: e.target.value }) }}>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="status">Enter status</label>
                    {/* <input type="text" className='form-control' id='status' name='status' onChange={(e) => { setEmployee({ ...employee, status: e.target.value }) }} /> */}
                    {/* <select name="status" className='col-12 text-center border border-1 pt-1 pb-1' id="status" onClick={(e) => { setEmployee({ ...employee, status: e.target.value }) }}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select> */}
                  </div>
                  <div className="mb-1">
                    <label htmlFor="gender">Enter gender</label>
                    {/* <input type="text" className='form-control' id='gender' name='gender' onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }} /> */}
                    <select name="gender" className='col-12 text-center border border-1 pt-1 pb-1' id="gender" onClick={(e) => { setEmployee({ ...employee, gender: e.target.value }) }}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                <form>
                  <div className="mb-1">
                    <label htmlFor="projectName">Enter Project name</label>
                    <input type="text" className='form-control' id='projectName' name='projectName' onChange={(e) => { setProject({ ...project, projectName: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="description">Enter Project description</label>
                    <input type="text" className='form-control' id='description' name='description' onChange={(e) => { setProject({ ...project, description: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="startDate">Enter Project start date</label>
                    <input type="date" className='form-control' id='startDate' name='startDate' onChange={(e) => { setProject({ ...project, startDate: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="endDate">Enter Project end date</label>
                    <input type="date" className='form-control' id='endDate' name='endDate' onChange={(e) => { setProject({ ...project, endDate: e.target.value }) }} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addProject} data-bs-dismiss="modal">Add</button>
                  </div>
                </form>
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
                <form>
                  <div className="mb-1">
                    <label htmlFor="clientName">Enter Client name</label>
                    <input type="text" className='form-control' id='clientName' name='clientName' onChange={(e) => { setClient({ ...client, clientName: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="clientEmail">Enter Client email</label>
                    <input type="email" className='form-control' id='clientEmail' name='clientEmail' onChange={(e) => { setClient({ ...client, clientEmail: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="contact">Enter Client contact</label>
                    <input type="text" className='form-control' id='contact' name='contact' onChange={(e) => { setClient({ ...client, contact: e.target.value }) }} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addClient} data-bs-dismiss="modal">Add</button>
                  </div>
                </form>
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
                <form>
                  <div className="mb-1">
                    <label htmlFor="date">Fill date</label>
                    <input type="date" className='form-control' id='date' name='date' onChange={(e) => { setHoliday({ ...holiday, date: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="holidayDesp">Fill desciption</label>
                    <input type="text" className='form-control' id='holidayDesp' name='holidayDesp' onChange={(e) => { setHoliday({ ...holiday, holidayDesp: e.target.value }) }} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addHoliday} data-bs-dismiss="modal">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Add TimeSheet Modal */}
        <div className="modal fade" id="addTimeSheetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add TimeSheet</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {!holidayEnabled ? <form>
                  <div className="mb-1">
                    <label htmlFor="workingHour">Fill working hour</label>
                    <input type="number" className='form-control' id='workingHour' name='workingHour' onChange={(e) => { setTimeSheet({ ...timeSheet, workingHour: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="date">Date (Date is autofilled)</label>
                    <input type="date" className='form-control' id='date' name='date' min={currentDate} max={currentDate} onChange={(e) => { setTimeSheet({ ...timeSheet, date: e.target.value }) }} />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="projectId">Enter project Id</label>
                    <input type="number" className='form-control' id='projectId' name='projectId' onChange={(e) => { setTimeSheet({ ...timeSheet, projectId: e.target.value }) }} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addTimeSheet} data-bs-dismiss="modal">Add</button>
                  </div>
                </form> : <h1>You cannot upload timesheet because today is holiday <hr /> Enter your details tomorrow</h1>}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
