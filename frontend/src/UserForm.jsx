import React from "react";
import { useState } from "react";
import './UserForm.css';

function UserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data_nascita: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8000/api/users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Utente aggiunto con successo!');
        setFormData({ nome: '', email: '', data_nascita: '' });

        if (onUserAdded) {
          onUserAdded(result.data);
        }
      } else {
        setError(result.message || 'Errore durante l\'inserimento');
      }
    } catch (err) {
      console.error('Errore:', err);
      setError('Errore di connessione al server');
    }
  };

  return (
    <div className="user-form-container">
      <h2>Aggiungi Nuovo Utente</h2>

      {error && <div className="user-form-error">{error}</div>}
      {success && <div className="user-form-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="user-form-field">
          <label>Nome *</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="user-form-field">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="user-form-field">
          <label>Data di Nascita *</label>
          <input
            type="date"
            name="data_nascita"
            value={formData.data_nascita}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <button
          type="submit"
          className="user-form-submit"
        >
          Aggiungi Utente
        </button>
      </form>
    </div>
  );
}

export default UserForm
