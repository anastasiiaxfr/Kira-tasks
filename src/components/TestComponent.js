import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const TestComponent = () => {
  const { user, loading, login, logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user ? `Welcome, ${user.name}` : 'Not logged in'}</h1>
      <button onClick={() => login({ name: 'John Doe', role: 'user' })}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default TestComponent;
