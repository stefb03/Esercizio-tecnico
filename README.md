# Esercizio tecnico

## Con Docker

### Prerequisito

- **Docker Desktop** >= 29.2.0

### Avvio

1. Apri il terminale nella cartella principale del progetto

2. Avvia i container:
    docker compose up --build

## Senza Docker

### Prerequisiti

- **PHP** >= 8.0.30
- **Node.js** >= 22.14.0
- **npm** >= 10.9.2

### Avvio

#### Backend

1. Apri il terminale nella cartella principale del progetto

2. Naviga nella cartella backend:
    cd backend

3. Avvia il server PHP:
    c:\xampp\php\php -S localhost:8000 
    _(Adatta il percorso se PHP è installato altrove)_

#### Frontend

1. Apri un **nuovo terminale** nella cartella principale del progetto

2. Naviga nella cartella frontend:
    cd frontend

3. Installa le dipendenze:
    npm install

4. Avvia il server di sviluppo:
    npm run dev