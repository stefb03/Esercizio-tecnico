<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

define('DATA_FILE', __DIR__ . '/../data/users.json');

function response($success, $data = null, $message = '', $code = 200) {
    http_response_code($code);
    echo json_encode(compact('success', 'data', 'message'));
    exit;
}

function readJson($file) {
    return file_exists($file)
        ? json_decode(file_get_contents($file), true) ?? []
        : [];
}

function writeJson($file, $data) {
    if (!is_dir(dirname($file))) {
        mkdir(dirname($file), 0777, true);
    }
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isValidDate($date) {
    $d = DateTime::createFromFormat('Y-m-d', $date);
    return $d && $d->format('Y-m-d') === $date;
}
