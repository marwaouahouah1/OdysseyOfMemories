// Signup.js
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/connexion", {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
    }
  };

  // Votre formulaire d'inscription
};

export default Login;

