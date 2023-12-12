import React, { useState, useEffect } from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import DoctorCalendar from '../../components/DoctorCalendar';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";

const DoctorAppointment = () => {
  const [isError, setIsError] = useState(false);
  const [doctorUserId, setDoctorUserId] = useState('');
  const [appointments, setAppointments] = useState([
    {
      title: '',
      start: new Date(),
      end: new Date(),  // 5:00 PM
      appointmentId: '',
      appointmentStatus: '',
      slots: ''
    },
  ]);


  useEffect(() => {
    // Replace 'http://localhost:8080' with your actual API URL
    fetch('http://localhost:8080/checkLoggedInDoctor')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setDoctorUserId(data);
        // Once you have the patientUserId, make another request to get appointments
        fetch(`http://localhost:8080/docappointments?doctorUserId=${data}`)
          .then((appointmentsResponse) => {
            if (appointmentsResponse.ok) {
              return appointmentsResponse.json();
            }
            throw new Error('Network response was not ok');
          })
          .then((appointmentsData) => {
            const formattedAppointments = appointmentsData.map((appointment) => {
              // Extract date and time components
              const [year, month, day] = appointment.scheduleDate.split('-').map(Number);
              const [hours, minutes] = appointment.startTime.split(':').map(Number);
              const [hours2, minutes2] = appointment.endTime.split(':').map(Number);

              // Create Date objects for start and end times
              const startDate = new Date(year, month - 1, day, hours, minutes);
              const endDate = new Date(year, month - 1, day, hours2, minutes2);

              // Create an appointment object
              return {
                title: appointment.patientName,
                start: startDate,
                end: endDate,
                appointmentId: appointment.transactionNo,
                appointmentStatus: appointment.status,
                slots: appointment.slots
              };
            });

            setAppointments(formattedAppointments);
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
          });

      })
      .catch((error) => {
        setIsError(true);
        console.error('Error:', error);
      });
  }, []);

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })
  return (
    <div>
      <DoctorNavbar />
      <div style={{ display: "flex", margin: "auto", width: "100vw", justifyContent: "center" }}>
      <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: "65%" }}
        />
         {appointments.filter(appointment => appointment).length > 0 ? (
        <div style={{ marginLeft: "30px" }}>
          <h1>My Clinic</h1>
         
          <table>
            <tr>
              <td rowSpan={2} width={200} style={{ border: "1px solid lightgray", backgroundColor: "lightgray", paddingLeft: "10px" }}>11/06/23 MONDAY <br /> 2:00-5:00 PM</td>
              <td><Link to="/addremove"><button style={{ borderRadius: 0, width: "250px" }}>Add/Remove Slots</button></Link></td>
            </tr>
            <tr><td><button className='cancel' style={{ width: "100%" }}>Cancel Appointments</button></td></tr>
            <br />
            <tr>
              <td>{appointments.title}</td>
              <td><Link to="/manageappointments"><button style={{ borderRadius: 0, width: "250px" }}>Manage Appointments</button></Link></td>
            </tr>
          </table>
        </div>
        ) : (
          // Display a message if there are no appointments with appointmentStatus === "Approved by Doctor"
          <div style={{marginLeft: "1%"}}>
            <p>You have no appointments yet.</p>
            <Link to="/docsearch">
              <button>Set an appointment now</button>
            </Link>
          </div>
        )}
      </div>
      <DoctorFooter />
    </div>
  );
};

export default DoctorAppointment;
