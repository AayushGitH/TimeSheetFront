import React from 'react'
import { useEffect } from 'react'
import { getTimesheetsapi, updateTimeSheetapi } from '../services/employee_service'
import { useState } from 'react'
import nodata from '../images/nodata.jpg';

const TimeSheets = () => {

  useEffect(() => {
    getTimesheetsapi().then(
      (response) => {
        console.log(response.data);
        setTimeSheets(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  // Properties
  const [timeSheets, setTimeSheets] = useState([]);
  const [editTimeSheet, setEditTimeSheet] = useState({});

  // Edit Click method
  const onEditClick = (event, index) => {
    setEditTimeSheet(timeSheets[index]);
  }

  // Update Click method
  const updateTimeSheet = () => {
    updateTimeSheetapi(editTimeSheet).then(
      (response) => {
        console.log(response.data);
        // navigate('/projects')
        window.location.href = '/timeSheets'
      },
      (error) => {
        console.log(error);
      }
    )
  }

  return (
    <div>
      <div className="container-fluid p-5">
        <table className="table table-sm table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">TimeSheet Id</th>
              <th scope="col">Date</th>
              <th scope="col">Working hour</th>
              <th scope="col">Project Id</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          {timeSheets.length > 0 ? timeSheets.map((item, index) => (
            <tbody>
              <tr>
                <th scope="row" key={item.holidayId}>
                  {item.timesheetId}
                </th>
                <td>{item.date}</td>
                <td>{item.workingHour}</td>
                <td>{item.projectId}</td>
                <td className='d-flex justify-content-center'>
                  <button className='btn btn-outline-primary btn-sm me-2' onClick={(e) => { onEditClick(e, index) }} data-bs-toggle="modal" data-bs-target="#updateHolidayModal">Update</button>
                </td>
              </tr>

            </tbody>
          )) : <div className="text-center">
            <img src={nodata} alt="Description Here" className="img-fluid" />
          </div>}
        </table>
      </div>

      {/* Update TimSheet Modal */}
      <div className="modal fade" id="updateHolidayModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update TimeSheet</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label htmlFor="workingHour">Fill working hour</label>
                  <input type="number" className='form-control' id='workingHour' name='workingHour' value={editTimeSheet.workingHour} onChange={(e) => { setEditTimeSheet({ ...editTimeSheet, workingHour: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="date">Enter date</label>
                  <input type="date" className='form-control' id='date' name='date' disabled value={editTimeSheet.date} onChange={(e) => { setEditTimeSheet({ ...editTimeSheet, date: e.target.value }) }} required />
                </div>
                <div className="mb-1">
                  <label htmlFor="projectId">Enter project Id</label>
                  <input type="number" className='form-control' id='projectId' name='projectId' value={editTimeSheet.projectId} onChange={(e) => { setEditTimeSheet({ ...editTimeSheet, projectId: e.target.value }) }} required />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={updateTimeSheet} data-bs-dismiss="modal">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeSheets
