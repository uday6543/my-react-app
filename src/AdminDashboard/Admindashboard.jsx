import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseconfig/firebaseconfig';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Admindashboard = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const doctorNameMap = {
    meeraiyer: "Dr. Meera Iyer",
    swamynair: "Dr. Swamy Nair",
    vishalmenon: "Dr. Vishal Menon",
    anjalireddy: "Dr. Anjali Reddy",
    sandeeprao: "Dr. Sandeep Rao",
    karthikrao: "Dr. Karthik Rao"
  };

  const fullDoctorName = doctorNameMap[doctorId] || "Unknown Doctor";
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!fullDoctorName || fullDoctorName === "Unknown Doctor") return;

      try {
        const q = query(
          collection(db, 'appointments'),
          where('doctorName', '==', fullDoctorName)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [fullDoctorName]);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully ");
      navigate('/admin-login');
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to log out");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily:'sans-serif' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e0f2f1',
        padding: '16px 24px',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h2 style={{ margin: 0, color: '#00796b' }}>Welcome, {fullDoctorName}</h2>
        <button onClick={handleLogout} style={{
          backgroundColor: '#d32f2f',
          color: 'white',
          padding: '10px 18px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Logout
        </button>
      </div>

      {/* Appointment List */}
      <h3>Appointments:</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {appointments.map(appt => (
            <li key={appt.id} style={{
              background: '#f9f9f9',
              border: '1px solid #ddd',
              padding: '12px 16px',
              marginBottom: '10px',
              borderRadius: '6px'
            }}>
              <strong>{appt.patientName}</strong> | {appt.date} | {appt.time} <br />
              <span style={{ color: '#555' }}>Problem: {appt.problem}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admindashboard;
