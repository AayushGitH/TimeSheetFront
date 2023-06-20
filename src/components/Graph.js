import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5, 10];
const labels = [100, 200, 300, 400, 500, 600, 700, 900, 1000];

const options = {
  fill: true,
  animations: false,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Graph() {

  // Properties
  const [projectId] = useParams();
  const [enabled, setEnabled] = useState(false);
  const [year, setYear] = useState(0);
  const [domain, setDomain] = useState('');

  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Personal graphs",
          tension: 0.3,
          data: scores,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(192, 192, 192, 1.0)",
        },
      ],
      labels,
    };
  }, []);

  const makeGraph = () => {
    console.log('I am make graph method')
    if (!enabled)
      setEnabled(true);
    else
      setEnabled(false);
  }

  const saveCredentials = (e) => {
    console.log('The domain is ', domain)
    console.log('The year is ', year)
    e.preventDefault()
  }

  return (
    <div className="App container-fluid" >
      <h6>The project id is {projectId}</h6>
      <form onSubmit={saveCredentials} className="container-fluid col-6 mt-5 shadow-lg p-5">
        <div className="mb-2">
          <label htmlFor="domain">Enter domain</label>
          <select name="domain" className='col-12 text-center border border-1 pt-1 pb-1 mt-1' id="domain" onChange={(e) => { setDomain({ ...domain, domain: e.target.value }) }}>
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Week">Week</option>
          </select>
        </div>
        <div className="mb-1">
          <label htmlFor="year">Enter year</label>
          <select name="year" className='col-12 text-center border border-1 pt-1 pb-1 mt-1' id="year" onChange={(e) => { setYear({ ...year, year: e.target.value }) }}>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="mb-1">
          <button type="button" className="btn btn-secondary" >Close</button>
          <button type="submit" className="btn btn-primary ms-1" >...Set...</button>
        </div>
      </form>
      <button onClick={makeGraph} className="btn btn-outline-dark mt-5">Create graph</button>
      {enabled && <div className="container-fluid mt-5 mb-5">
        <Bar data={data} options={options} width={500} />
      </div>}
    </div>
  );
}