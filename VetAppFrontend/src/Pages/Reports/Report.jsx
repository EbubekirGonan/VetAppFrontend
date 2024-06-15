import axios from 'axios'
import { useState, useEffect } from 'react'

function Report() {

  const [reports, setReports] = useState([]) ;
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [newReport, setNewReport] = useState({
    title:"",
    diagnosis: "",
    price: "",
    appointmentId: ""
  })

  const [updateReport, setUpdateReport] = useState({
    title:"",
    diagnosis: "",
    price: "",
    appointmentId: ""
  })

  useEffect(() => {
    axios
    .get(import.meta.env.VITE_APP_BASEURL + "api/v1/reports")
    .then((res) => {
      setReports(res.data.content);
      console.log(res.data.content);
    }
    );

    axios
    .get(import.meta.env.VITE_APP_BASEURL + "api/v1/appointments")
    .then((res) => setAppointments(res.data.content))
    .then(() => setUpdate(false))
  }, [update])

  const handleNewReportInputChange  = (e) => {
    const {name, value} = e.target
    setNewReport((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleNewReportAppointment  = (e) => {
    const {name, value} = e.target
    console.log(name);
    console.log(value);
    setNewReport({
      ...newReport,
      [name]: value
    })
  }

  const handleAddNewReport  = () => {
    console.log(newReport);
    axios
    .post(import.meta.env.VITE_APP_BASEURL + "api/v1/reports", newReport)
    .then(() => setUpdate(true))
    .then(setNewReport({
      title:"",
      diagnosis: "",
      price: "",
      appointmentId: ""
    }))
  }

  const handleUpdateInput  = (e) => {
    const {id} = e.target
    setIsUpdating(true)
    setUpdateReport(reports.find((report) => report.id == id))
    const console = () => console.log(updateReport);
    console();
  }

  const handleUpdateReportInputChange  = (e) => {
    const {name, value} = e.target
    console.log(name);
    console.log(value);
    setUpdateReport((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log(updateReport);
  }

  const handleUpdateReportBtn  = () => {
    const {id} = updateReport
    console.log(id);
    console.log(updateReport);
    axios
    .put(import.meta.env.VITE_APP_BASEURL + `api/v1/reports/${id}`, updateReport)
    .then((res) => console.log(res))
    .then(() => setUpdateReport({
      title:"",
      diagnosis: "",
      price: "",
      appointmentId: ""
    }))
    .then(() => setIsUpdating(false))
    .then(() => setUpdate(true))
  }

  const handleDeleteInput  = (e) => {
    const {id} = e.target
    axios
    .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/reports/${id}`)
    .then(() => setUpdate(true))
  }

  const handleSearchReport = (value) => {
    if(value == ''){
      setUpdate(true)
    } else {
      const searchedReport = reports.filter((report) => report.title.toLowerCase().includes(value))
      setReports(searchedReport);
    }

  }


  return (
  <>

  <h3>Search Report</h3>
  <input 
  type="text" 
  placeholder='Search Report'
  onChange={(e) => handleSearchReport(e.target.value)}
  />


  <div className='add-and-update-bar'>
    <h2>Add New Report</h2>
    <input 
    type="text"
    placeholder='title'
    name='title'
    value={newReport.title}
    onChange={handleNewReportInputChange}
    />
    <input 
    type="text"
    placeholder='diagnosis'
    name='diagnosis'
    value={newReport.diagnosis}
    onChange={handleNewReportInputChange}
    />
    <input 
    type="text"
    placeholder='price'
    name='price'
    value={newReport.price}
    onChange={handleNewReportInputChange}
    />
    <select name="appointmentId" onChange={handleNewReportAppointment}>
      <option value="">Select Appointment</option>
      {appointments.map((appointment) => (
        <option key={appointment.id} value={appointment.id}>
          {appointment.appointmentDate} - {appointment.doctor.name} - {appointment.animal.name}
        </option>
      ))}
    </select>

    <button onClick={handleAddNewReport}> Add New Report</button>

    {isUpdating && 
    <div>
      <h2>Update Report</h2>
      <input 
      type="text"
      placeholder='title'
      name='title'
      value={updateReport.title}
      onChange={handleUpdateReportInputChange}
      />
      <input 
      type="text"
      placeholder='diagnosis'
      name='diagnosis'
      value={updateReport.diagnosis}
      onChange={handleUpdateReportInputChange}
      />
      <input 
      type="text"
      placeholder='price'
      name='price'
      value={updateReport.price}
      onChange={handleUpdateReportInputChange}
      />
      <select name="appointmentId" disabled>
      <option value=''></option>
      </select>

    <button onClick={handleUpdateReportBtn}>Update Report</button>
    </div>
    }    
  </div>

  <table>
    <thead>
      <tr>
        <th>Report Title</th>
        <th>Diagnosis</th>
        <th>Price</th>
        <th>Appointment Date</th>
        <th>Animal Name</th>
        <th>Doctor Name</th>
      </tr>
    </thead>
    <tbody>
      {reports.map((report, index) => (
        <tr key={index}>
          <td>{report.title}</td>
          <td>{report.diagnosis}</td>
          <td>{report.price}</td>
          <td>{report.appointment.date}</td>
          <td>{report.appointment.animalName}</td>
          <td>{report.appointment.doctorName}</td>
          <button id={report.id} onClick={handleDeleteInput}>DELETE</button>
          <button id={report.id} onClick={handleUpdateInput}>UPDATE</button>
        </tr>
      ))}

    </tbody>
  </table>



  {/* <ul>
    {reports.map((report) => (
      <div key={report.id}>
        <li>
          {report.title} - {report.diagnosis} - {report.price} - {report.appointment.doctorName} - {report.appointment.animalName} - {report.appointment.customerName}
          <span id={report.id} onClick={handleDeleteInput}>DELETE</span> - 
          <span id={report.id} onClick={handleUpdateInput}>UPDATE</span>
        </li>
      </div>          
          ))}
    </ul> */}
  </>
  )
}

export default Report