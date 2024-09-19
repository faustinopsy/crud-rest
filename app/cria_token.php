<?php

require_once '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$passphrase = 'fatecitaquera';

$privateKeyFile = '../fatec';

$privateKey = openssl_pkey_get_private(
    file_get_contents($privateKeyFile),
    $passphrase
);

$payload = [
    'iss' => 'example.org',
    'aud' => 'example.com',
    'iat' => 1356999524,
    'nbf' => 1357000000
];

$jwt = JWT::encode($payload, $privateKey, 'RS256');
echo "Encode:\n" . print_r($jwt, true) . "\n";

