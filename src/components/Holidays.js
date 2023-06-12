import React, { useEffect, useState } from 'react'
import { getHolidaysapi, updatedHolidayapi } from '../services/admin_service'
import nodata from '../images/nodata.jpg';

const Holidays = () => {

  useEffect(() => {
    getHolidaysapi().then(
      (response) => {
        console.log(response);
        setHolidays(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  // Properties
  const [holidays, setHolidays] = useState([]);
  const [editHoliday,setEditHoliday] = useState({});

  // Edit Click method
  const onEditClick = (event, index) => {
    setEditHoliday(holidays[index])
  }

  // Update Click method
  const updateHoliday = () => {
    updatedHolidayapi(editHoliday).then(
      (response) => {
        console.log(response.data);
        // navigate('/projects')
        window.location.href = '/holidays'
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
              <th scope="col">Holiday Id</th>
              <th scope="col">Holiday date</th>
              <th scope="col">Description</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          {holidays.length > 0 ? holidays.map((item, index) => (
            <tbody>
              <tr>
                <th scope="row" key={item.holidayId}>
                  {item.holidayId}
                </th>
                <td>{item.date}</td>
                <td>{item.holidayDesp}</td>
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

      {/* Update Holiday Modal */}
      <div className="modal fade" id="updateHolidayModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Holiday</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                  <div className="mb-1">
                    <label htmlFor="date">Fill date</label>
                    <input type="date" className='form-control' id='date' name='date' value={editHoliday.date} onChange={(e) => { setEditHoliday({ ...editHoliday, date: e.target.value }) }} required />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="holidayDesp">Fill desciption</label>
                    <input type="text" className='form-control' id='holidayDesp' name='holidayDesp' value={editHoliday.holidayDesp} onChange={(e) => { setEditHoliday({ ...editHoliday, holidayDesp: e.target.value }) }} required />
                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={updateHoliday} data-bs-dismiss="modal">Update</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Holidays
