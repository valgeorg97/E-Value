import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/firebase";
import "./Register.css";

/**
 * Register component provides a registration form for new users, utilizing Firebase Auth for user creation
 * and Firestore for storing user, cart, and favorites data. It validates email and password inputs before
 * attempting to register the user. Upon successful registration, it automatically creates corresponding
 * cart and favorites documents in Firestore for the user and navigates to the homepage.
 *
 */


const Register: React.FC = () => {
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (regEmail.length < 3 || !regEmail.includes('@')) {
        toast.error('Invalid email address', {
          position: "top-center",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        });
        return;
      }
  
      if (!regPassword || regPassword.length < 6) {
        toast.error('Password must be at least 6 characters', {
          position: "top-center",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        });
        return;
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = userCredential.user;
  
      const usersCollection = collection(db, "users");
  
      const userDocRef = await addDoc(usersCollection, {
        uid: user.uid,
        email: regEmail,
        password: regPassword,
      });
  
      console.log("User registered and added to Firestore:", userDocRef.id);
  
      const cartCollection = collection(db, "cart");
      await addDoc(cartCollection, {
        userId: user.uid,
        products: [],
      });
  
      const favoritesCollection = collection(db, "favorites");
      await addDoc(favoritesCollection, {
        userId: user.uid,
        products: [], 
      });
  
      toast.success('Successful registration!', {
        position: "top-center",
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
      navigate('/'); 
  
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
