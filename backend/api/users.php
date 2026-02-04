<?php
require 'config.php';

$users = readJson(DATA_FILE);

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        response(true, $users, 'Utenti recuperati');
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        validateUser($data, $users);

        $user = [
            'id' => uniqid('user_'),
            'nome' => trim($data['nome']),
            'email' => strtolower(trim($data['email'])),
            'data_nascita' => $data['data_nascita']
        ];

        $users[] = $user;

        writeJson(DATA_FILE, $users)
            ? response(true, $user, 'Utente creato', 201)
            : response(false, null, 'Errore salvataggio', 500);
        break;

    default:
        response(false, null, 'Metodo non supportato', 405);
}

function validateUser($data, $users) {

    if (empty($data['nome']) || strlen(trim($data['nome'])) < 2) {
        response(false, null, 'Nome non valido', 400);
    }

    if (empty($data['email']) || !isValidEmail($data['email'])) {
        response(false, null, 'Email non valida', 400);
    }

    foreach ($users as $u) {
        if ($u['email'] === strtolower($data['email'])) {
            response(false, null, 'Email già registrata', 400);
        }
    }

    if (empty($data['data_nascita']) || !isValidDate($data['data_nascita'])) {
        response(false, null, 'Data di nascita non valida', 400);
    }

    $birth = new DateTime($data['data_nascita']);
    if ($birth > new DateTime() || $birth < new DateTime('-150 years')) {
        response(false, null, 'Data di nascita non valida', 400);
    }
}
