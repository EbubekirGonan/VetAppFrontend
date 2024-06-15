import './App.css';
import { Routes, Route } from "react-router-dom";
import Customer from './Pages/Customers/Customer';
import Animal from './Pages/Animals/Animal';
import Navbar from './components/Navbar';
import Appoinment from './Pages/Appointments/Appointment';
import AvailableDates from './Pages/AvailableDates/AvailableDates';
import Doctor from './Pages/Doctors/Doctor';
import Report from './Pages/Reports/Report';
import Vaccination from './Pages/Vaccinations/Vaccination';
import HomePage from './Pages/HomePage/HomePage';
import {useState} from 'react';


function App() {

  const [homePage, setHomePage] = useState(true);

  return (
    <>
      
        <Navbar></Navbar>
        <div className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/appointment" element={<Appoinment />} />
          <Route path="/availableDates" element={<AvailableDates />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/report" element={<Report />} />
          <Route path="/vaccination" element={<Vaccination />} />
        </Routes>
      </div>

    </>
  );
}

export default App
