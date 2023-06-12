import React from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Example = () => {
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
      const handleSelect=(ranges)=>{
        console.log(ranges);
      }
  return (
    <div className='d-flex justify-content-center mt-5'>
      <DateRangePicker ranges={[selectionRange]}
        onChange={handleSelect}/>
    </div>
  )
}

export default Example
