import React, { cache, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
import { auth, db } from '../firebaseconfig/firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const Admin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const allowedDoctors = [
    'anjalireddy@gmail.com',
    'karthikrao@gmail.com',
    'swamynair@gmail.com',
    'sandeeprao@gmail.com',
    'meeraiyer@gmail.com',
    'vishalmenon@gmail.com'
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!allowedDoctors.includes(email)) {
        alert("Access denied. Only registered doctors can log in.");
        return;
      }
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const doctorId = email.split('@')[0].toLowerCase().replace(/\./g, '');

        navigate(`/admindashboard/${encodeURIComponent(doctorId)}`);
      } catch (error) {
        alert("Login Failed please check your Email or Password ")
      };
      // Handle login logic
    } else {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredentials.user;
        const docref = doc(db, 'admins', name)
        await setDoc(docref, {
          name,
          email,
          uid: user.uid,
          createdAt: new Date()
        })
        alert("Signup successful");
        setIsLogin(true); // switch to login after signup
      } catch (error) {
        console.error("Signup Error:", error);
        alert("Signup Failed: " + error.message);

      }
    }
  }

  return (
    <div className="signup-container">
      <h1>To do manipulations please signup/Login your self.</h1>
      <h2>{isLogin ? 'Admin Login' : 'Admin Signup'}</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Enter your name" required onChange={(e) => setname(e.target.value)} />
        )}

        <input type="email" placeholder="Enter your email" required onChange={(e) => setemail(e.target.value)} />
        <input type="password" placeholder="Enter your password" required onChange={(e) => setpassword(e.target.value)} />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="toggle-button"
        >
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}


export default Admin;
