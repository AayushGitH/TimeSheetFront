import React, { useEffect, useState } from 'react'
import { getClientsapi, getProjectsapi, mapClientapi, updateEmployeesapi, updateProjectapi } from '../services/admin_service'
import nodata from '../images/nodata.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {


  useEffect(() => {
    console.log('Under projects page and I am Aayush')
    getClientsapi().then((response) => { setClients(response.data) }, (error) => { console.log(error) });
    getProjectsapi().then(
      (response) => {
        setProjects(response.data);
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  // Properties
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editProject, setEditProject] = useState({});
  const [clients, setClients] = useState([]);
  const [assignData, setAssignData] = useState({});
  const navigate = useNavigate();

  // Edit Click method
  const onEditClick = (event, index) => {
    console.log('The index is this ', index)
    setEditProject(projects[index]);
  }

  // Update Click method
  const updateProject = () => {
    updateProjectapi(editProject).then(
      (response) => {
        console.log(response.data);
        // navigate('/projects')
        window.location.href = '/projects'
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Assign Click method
  const onAssignClick = (event, index) => {
    setAssignData({
      projectId: projects[index].projectId
    })
  }

  // Mapping client  
  const mapClient = () => {
    // setAssignData({
    //   clientId: parseInt(assignData.clientId)
    // })
    console.log(assignData)
    mapClientapi(assignData).then((response) => {
      console.log(response)
      navigate('/projects')
    },
      (error) => {
        console.log(error)
      })
  }

  // View employee modal press method
  const onViewEmployeesClick = (event, index) => {
    setEmployees(projects[index].employee);
    console.log(employees);
  }

  // Renders graph page
  const viewGraph = () => {
    navigate('/graph')
  }

  return (
    <div className='mt-5'>
      <div className="container-fluid p-5">
        <table className="table table-sm table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">Project Id</th>
              <th scope="col">Project Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Description</th>
              <th scope="col">Employees</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          {projects.length > 0 ? projects.map((item, index) => (
            <tbody>
              <tr>
                <th scope="row" key={item.projectId}>
                  {item.projectId}
                </th>
                <td>{item.projectName}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.description}</td>
                <td>{item.employees}</td>
                <td className='d-flex justify-content-center'>
                  <button className='btn btn-outline-primary btn-sm me-2' onClick={(e) => { onEditClick(e, index) }} data-bs-toggle="modal" data-bs-target="#updateProjectModal">Update</button>
                  <button className='btn btn-danger btn-sm me-2' onClick={(e) => { onViewEmployeesClick(e, index) }} data-bs-toggle="modal" data-bs-target="#viewEmployeesModal">View employees</button>
                  <button className='btn btn-secondary btn-sm me-2' onClick={(e) => { onAssignClick(e, index) }} data-bs-toggle="modal" data-bs-target="#assignClientModal">Map Client</button>
                  <Link className='btn btn-warning btn-sm' to={`/graph/${item.projectId}`}>See Graph</Link>
                </td>
              </tr>

            </tbody>
          )) : <div className="text-center">
            <img src={nodata} alt="Description Here" className="img-fluid" />
          </div>}
        </table>
      </div>

      {/* Update Project Modal */}
      <div className="modal fade" id="updateProjectModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Project</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label htmlFor="projectName">Enter Project name</label>
                  <input type="text" className='form-control' id='projectName' name='projectName' value={editProject.projectName} onChange={(e) => { setEditProject({ ...editProject, projectName: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="description">Enter Project description</label>
                  <input type="text" className='form-control' id='description' name='description' value={editProject.description} onChange={(e) => { setEditProject({ ...editProject, description: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="startDate">Enter Project start date</label>
                  <input type="date" className='form-control' id='startDate' name='startDate' value={editProject.startDate} onChange={(e) => { setEditProject({ ...editProject, startDate: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="endDate">Enter Project end date</label>
                  <input type="date" className='form-control' id='endDate' name='endDate' value={editProject.endDate} onChange={(e) => { setEditProject({ ...editProject, endDate: e.target.value }) }} required />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={updateProject} data-bs-dismiss="modal">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Client Modal */}
      <div className="modal fade" id="assignClientModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Assign Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-1">
                  <label htmlFor="projectId">Project id</label>
                  <input type="number" className='form-control' id='projectId' name='projectId' value={assignData.projectId} disabled onChange={(e) => { setAssignData({ ...assignData, projectId: e.target.value }) }} />
                </div>
                <div className="mb-1">
                  <label htmlFor="clientId">Present Clients</label>
                  <select name="clientId" type="select" className='col-12 text-center border border-1 pt-1 pb-1' onChange={(e) => { setAssignData({ ...assignData, clientId: e.target.value }) }} id="clientId">
                    <option value={0} >--Select Client--</option>
                    {

                      clients.map((opts) => (
                        <option value={opts.clientId} key={opts.clientId}>
                          {"Client :-" + opts.clientName}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={mapClient} data-bs-dismiss="modal">Map</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* View Employees Modal */}
      <div className="modal fade" id="viewEmployeesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Employees assigned</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                employees.length > 0 ? employees.map((item,index)=>(
                  <div>
                    <h6>{item.name}</h6>
                    <h6>{item.email}</h6>
                    <hr />
                  </div>
                ))
                : (<h2>No employees assigned yet....</h2>)
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Projects
