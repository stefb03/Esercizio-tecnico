import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import UserForm from './UserForm.jsx'
import UserList from './UserList.jsx'

function App() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users.php');
      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
        setError('');
      } else {
        setError(result.message || 'Errore nel caricamento degli utenti');
      }
    } catch (err) {
      setError('Errore di connessione al server');
      console.error('Errore:', err);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <div className="app-container">

      <UserForm onUserAdded={handleUserAdded} />

      <hr className="divider" />
      {error ? (
        <div className="error-box">
          {error}
        </div>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}

export default App
