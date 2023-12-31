import React, { useState } from "react";
import Layout from '/layouts/layout';
import { useRouter } from 'next/router';
import CenteredContentWrapper from '/layouts/centered';

function RegisterForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // Add useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      console.error("Invalid username format");
      return;
    }

    // Validate other fields if needed
    if (name === "" || lastName === "" || email === "" || password === "") {
      console.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/register/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, username, password }),
      });

      if (response.ok) {
        // Registration successful
        console.log("User registered successfully");

        // Redirect the user to the homepage
        router.push('/home/home');
      } else {
        // Registration failed
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <CenteredContentWrapper>
    <form onSubmit={handleSubmit}>
        <div className="flex flex-col" style={{ marginTop: '80px' }}> {/* Use Flexbox to create a column layout */}
          <div className="input-container">
            
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
            
            <input
              type="text"
              value={lastName}
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
           
            <input
              type="email"
              value={email}
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
           
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
            
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit">Register</button>
        </div>
      </form>
      </CenteredContentWrapper>
      </Layout>
  );
}

export default RegisterForm;
