import React from 'react'
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import { Link } from 'react-router-dom';
import DoctorCalendar from '../../components/DoctorCalendar';

const ManageAppointments = () => {
  
  return (
    <div>
    <DoctorNavbar />
    <div style={{ display: "flex", margin: "auto", width: "100vw", justifyContent: "center" }}>
        <DoctorCalendar />

        <div style={{ marginLeft: "30px" }}>
          <h1>My Clinic</h1>
          <table>
            <tr>
              <td style={{width: "600", marginRight: "10px", fontSize:"20px"}}><b>Juan Santos Santiago</b></td>
              <td><Link to="/viewprofile"><button style={{borderRadius: 0, padding: 10, marginLeft: "10px", width:"100%"}}>View Profile</button></Link></td>
            </tr>
            <br />
            <tr>
                <td rowSpan={2}>11/06/2023 MONDAY <br/> 2:00-5:00 PM <br/> SLOT #1 <br/> <u><a href='#'>Move slot number</a></u></td>
                <td><Link to="/docresched"><button style={{borderRadius: 0, padding: 10, marginLeft: "10px", width:"100%", height:"45px"}}>Reschedule Appointment</button></Link></td>
            </tr>
            <tr>
                <td><button className='cancel' style={{padding: 10, marginLeft: "10px"}}>Cancel Appointment</button></td>
            </tr>
            <br/>
            <tr><td colSpan={2}><a href='#' style={{fontSize: "18px"}}><i>View Appointment History</i></a></td></tr>
          </table>
        </div>
      </div>
    <DoctorFooter />
    </div>
  )
};

export default ManageAppointments
