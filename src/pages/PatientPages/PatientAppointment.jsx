import React, { useState, useEffect } from 'react';
import PatientNavBar from '../../components/PatientNavBar';
import PatientFooter from '../../components/PatientFooter';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from 'react-router-dom';

const PatientAppointment = () => {
  const [appointments, setAppointments] = useState([
    {
      title: '',
      clinic: '',
      address: '',
      number: '',
      start: new Date(),
      end: new Date(),  // 5:00 PM
      appointmentId: '',
      appointmentStatus: ''
    },
  ]);
  useEffect(() => {
    // Replace 'http://localhost:8080' with your actual API URL
    fetch('http://localhost:8080/checkLoggedInPatient')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        // Once you have the patientUserId, make another request to get appointments
        fetch(`http://localhost:8080/appointments?patientUserId=${data}`)
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
                title: 'Dr. ' + appointment.doctorName,
                clinic: appointment.clinicName,
                address: appointment.address,
                number: appointment.clinic.officeNumber,
                start: startDate,
                end: endDate,
                appointmentId: appointment.transactionNo,
                appointmentStatus: appointment.status
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

  const handleCancel = async (appointmentId) => {
    try {
      // Find the appointment with the provided appointmentId
      const appointmentToCancel = appointments.find(appointment => appointment.appointmentId === appointmentId);
  
      if (!appointmentToCancel) {
        // Handle the case where the appointment with the given ID is not found
        console.error('Appointment not found');
        return;
      }
  
      // Check if the appointment is already cancelled
      if (appointmentToCancel.appointmentStatus === 'Cancelled') {
        // Display error message as a pop-up
        window.alert('Appointment is already cancelled');
        return;
      }
  
      // Proceed with the request to cancel the appointment
      const response = await fetch(`http://localhost:8080/appointmentChange/${appointmentId}?newStatus=Cancelled`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        console.log('Appointment cancelled successfully');
        window.location.reload();
      } else {
        console.error('Error cancelling appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };
  
  

  const handleReschedule = async (appointmentId) => {
    const appointmentToCancel = appointments.find(appointment => appointment.appointmentId === appointmentId);
  
    if (!appointmentToCancel) {
      // Handle the case where the appointment with the given ID is not found
      console.error('Appointment not found');
      return;
    }

    // Check if the appointment is already cancelled
    if (appointmentToCancel.appointmentStatus === 'Cancelled') {
      // Display error message as a pop-up
      window.alert('Appointment is already cancelled. It cannot be rescheduled.');
      return;
    }
    window.location.href = `/patresched/${appointmentId}`;
  };

  
  const CustomEvent = ({ event }) => (
    <div style={{ margin: '5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      <strong style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>{event.title}</strong>
      <p style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
        Clinic: {event.clinic}
      </p>
      <p style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', backgroundColor: getBorderColor(event.appointmentStatus) }}>
        {event.appointmentStatus}
      </p>
    </div>
  );


  const getBackgroundColor = (status) => {
    switch (status) {
      case 'Cancelled':
        return '#FCA694';
      case 'Rescheduled':
        return '#FFB97F';
      case 'Scheduled by Patient':
        return '#FFFFDC';
      case 'Approved by Doctor':
        return '#BAFFC4';
      default:
        return 'lightgray';
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'Cancelled':
        return '#A41D00';
      case 'Rescheduled':
        return '#FF7400';
      case 'Scheduled by Patient':
        return '#F8F547';
      case 'Approved by Doctor':
        return '#48DE66';
      default:
        return 'lightgray';
    }
  };

  


appointments.sort((a, b) => {
    const statusOrder = {
      'Cancelled': 3,
      'Rescheduled': 2,
      'Scheduled by Patient': 2,
      'Approved by Doctor': 1,
    };
  
    return statusOrder[a.appointmentStatus] - statusOrder[b.appointmentStatus];
  });
  
  return (
    <div>
      <PatientNavBar />
      <div style={{ display: "flex", margin: "auto", width: "100vw", justifyContent: "center" }}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800, width: '70%',  }}
          components={{
            event: CustomEvent, // Use the custom Event component
          }}
        />


        <div style={{ marginLeft: "30px" }}>
          <h1>My Appointments</h1>
          <div style={{ overflowY: 'auto', maxHeight: '720px' }}>
            {appointments.filter(appointment => appointment).length > 0 ? (
              // Display appointments
              appointments.map((appointment, index) => ((
                <table key={index}>
                  <thead>

                  </thead>
                  <tbody>
                  <tr>
                    <td
                      rowSpan={2}
                      width={200}
                      style={{
                        border: '3px dashed',
                        borderRadius: '10px', 
                        borderColor: getBorderColor(appointment.appointmentStatus),
                        backgroundColor: getBackgroundColor(appointment.appointmentStatus),
                        paddingLeft: '10px',                  
                      }}
                    >
                      {appointment.title} <br />
                      {appointment.clinic} <br />
                      {appointment.address} <br />
                      {appointment.number} <br />
                      {format(appointment.start, 'MM/dd/yyyy EEEE')} <br />
                      {format(appointment.start, 'h:mm a')} - {format(appointment.end, 'h:mm a')} <br />
                      {appointment.appointmentStatus} <br />
                    </td>

                    <td><button style={{ borderRadius: 0, width: "100%", height: "6vh" }} onClick={() => handleReschedule(appointment.appointmentId)}>Reschedule</button></td>
                  </tr>
                  <tr>
                    <td><button className='cancel' style={{ height: "6vh" }} onClick={() => handleCancel(appointment.appointmentId)} type="submit">Cancel</button></td>
                    
                  </tr>
                  </tbody>
                </table>
              )
              ))
            ) : (
              // Display a message if there are no appointments with appointmentStatus === "Approved by Doctor"
              <div>
                <p>You have no appointments yet.</p>
                <Link to="/docsearch">
                  <button>Set an appointment now</button>
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
      <PatientFooter />
    </div>
  );
}

export default PatientAppointment;
