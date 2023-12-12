import React from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import DoctorCalendar from '../../components/DoctorCalendar';

const DoctorResched = () => {
  return (
    <div>
      <DoctorNavbar />
        <div style={{ display: "flex", margin: "auto", width: "100vw", justifyContent: "center" }}>
            <DoctorCalendar />
    
            <div style={{ marginLeft: "30px" }}>
              <h1>My Appointments : <br/>Clinic</h1>
              <table>
                <tr><b>Juan Santos Santiago</b></tr>
                <tr>
                  <td> Date: 
                    <select name="sched" id="sched">
                    <option value="11/13/2023">November 13, 2023 (MONDAY)</option>
                    <option value="11/20/2023">November 20, 2023 (MONDAY)</option>
                    <option value="11/27/2023">November 27, 2023 (MONDAY)</option>
                    <option value="12/04/2023">December 4, 2023 (MONDAY)</option>
                  </select>
                  </td>
                </tr>
                <tr>
                <td>Time:  
                  <select name="time" id="startTime">
                    <option value="08:00:00">8:00 AM</option>
                    <option value="09:00:00">9:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="13:00:00">1:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                  </select>to
                  <select name="time" id="endTime">
                    <option value="08:00:00">8:00 AM</option>
                    <option value="09:00:00">9:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="13:00:00">1:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                    </select></td>
                </tr>
                <tr><td>Slot number:  
                  <select name="slot" id="slot">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    </select></td></tr>
                <tr><button style={{borderRadius: 0, width:"100%"}}>Submit</button></tr>
              </table>
            </div>
    
          </div>
          <DoctorFooter />
        </div>
      );
}

export default DoctorResched
