import React from 'react'
import { useEffect } from 'react'
import { getClientsapi, updateClientapi } from '../services/admin_service'
import { useState } from 'react'
import nodata from '../images/nodata.jpg';

const Clients = () => {

  useEffect(() => {
    getClientsapi().then(
      (response) => {
        console.log(response);
        setClients(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
  }, [])

  // Properties
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editClient, setEditClient] = useState({});

  // Edit Click method
  const onEditClick = (event, index) => {
    setEditClient(clients[index]);
  }

  // Update Click method
  const updateClient = () => {
    updateClientapi(editClient).then(
      (response) => {
        console.log(response.data);
        // navigate('/projects')
        window.location.href = '/clients'
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // View project press method
  const onViewProjectsClick = (event, index) => {
    setProjects(clients[index].project);
  }

  return (
    <div>
      <div className="container-fluid p-5">
        <table className="table table-sm table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">Client Id</th>
              <th scope="col">Client Name</th>
              <th scope="col">Client Email</th>
              <th scope="col">Contact</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          {clients.length > 0 ? clients.map((item, index) => (
            <tbody>
              <tr>
                <th scope="row" key={item.clientId}>
                  {item.clientId}
                </th>
                <td>{item.clientName}</td>
                <td>{item.clientEmail}</td>
                <td>{item.contact}</td>
                <td className='d-flex justify-content-center'>
                  <button className='btn btn-outline-primary btn-sm me-2' onClick={(e) => { onEditClick(e, index) }} data-bs-toggle="modal" data-bs-target="#updateProjectModal">Update</button>
                  <button className='btn btn-danger btn-sm me-2' onClick={(e) => { onViewProjectsClick(e, index) }} data-bs-toggle="modal" data-bs-target="#viewProjectsModal">View projects</button>
                </td>
              </tr>

            </tbody>
          )) : <div className="text-center">
            <img src={nodata} alt="Description Here" className="img-fluid" />
          </div>}
        </table>
      </div>

      {/* Update Client Modal */}
      <div className="modal fade" id="updateProjectModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label htmlFor="clientName">Enter Client name</label>
                  <input type="text" className='form-control' id='clientName' name='clientName' value={editClient.clientName} onChange={(e) => { setEditClient({ ...editClient, clientName: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="clientEmail">Enter Client email</label>
                  <input type="email" className='form-control' id='clientEmail' name='clientEmail' value={editClient.clientEmail} onChange={(e) => { setEditClient({ ...editClient, clientEmail: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="contact">Enter Client contact</label>
                  <input type="text" className='form-control' id='contact' name='contact' value={editClient.contact} onChange={(e) => { setEditClient({ ...editClient, contact: e.target.value }) }} required />
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={updateClient} data-bs-dismiss="modal">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* View Employees Modal */}
      <div className="modal fade" id="viewProjectsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Employees assigned</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                projects.length > 0 ? projects.map((item, index) => (
                  <div>
                    <h6>{item.projectName}</h6>
                    <h6>{item.description}</h6>
                    <hr />
                  </div>
                ))
                  : (<h2>No projects mapped yet....</h2>)
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Clients
