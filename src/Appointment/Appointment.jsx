import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseconfig/firebaseconfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import './Appointment.css';

const BookAppointment = () => {
    const { doctorName } = useParams();
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        problem: '',
        date: '',
        time: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const decodename=decodeURIComponent(doctorName)
            const docref=collection(db,'appointments')
            await addDoc(docref,{
                ...formData,
                doctorName:decodename,
                createdAt:Timestamp.now()
            })

            alert("Appointment Booked Successfully");
            //to reset the from
            setFormData({
                patientName: '',
                age: '',
                problem: '',
                date: '',
                time: ''
            });
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment. Try again.");
        }
    };

    //available time slots
    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM",
        "03:00 PM", "04:30 PM", "06:00 PM"
    ];

    return (
        <div className="book-container">
            <h2>Book Appointment with <span>{decodeURIComponent(doctorName)}</span></h2>
            <form onSubmit={handleSubmit} className="appointment-form">
                <input
                    type="text"
                    name="patientName"
                    placeholder="Your Name"
                    value={formData.patientName}
                    required
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Your Age"
                    value={formData.age}
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="problem"
                    placeholder="Problem / Symptoms"
                    value={formData.problem}
                    required
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    required
                    onChange={handleChange}
                />

                <select
                    name="time"
                    value={formData.time}
                    required
                    onChange={handleChange}
                >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    ))}
                </select>

                <button type="submit">Confirm Appointment</button>
            </form>
        </div>
    );
};

export default BookAppointment;
