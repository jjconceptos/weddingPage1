import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/auth/authContext';
import Layout from '/layouts/layout';
import CenteredContentWrapper from '/layouts/centered';


const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
  
        // Update clearance level in auth context
        dispatch({ type: 'LOGIN', payload: { clearanceLevel: data.clearanceLevel } });
        
        // Redirect the user to the appropriate route based on their clearance level
        
        router.push('/home/home'); // Adjust the path as needed
        
        
        
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Layout>
    <CenteredContentWrapper>
    <div >
    <h2></h2>
    
    <div className="input-container" style={{ marginTop: '60px' }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
    </div>
    <div className="input-container">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button onClick={handleLogin}>Login</button>
    </div>
  </div>
  </CenteredContentWrapper>  
  </Layout>
  );
};

export default Login;
