import React from 'react';
import './UserList.css';

function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p className="empty-message">Nessun utente presente.</p>;
  }

  return (
    <div className="user-list">
      <h2 className="title">Lista Utenti ({users.length})</h2>

      <div className="grid-row grid-header">
        <div>Nome</div>
        <div>Email</div>
        <div>Data di nascita</div>
      </div>

      {users.map(user => (
        <div key={user.id} className="grid-row">
          <div>{user.nome}</div>
          <div>{user.email}</div>
          <div>
            {new Date(user.data_nascita).toLocaleDateString('it-IT')}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList
