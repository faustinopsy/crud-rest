<?php

require_once '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$jwt = json_decode(file_get_contents("php://input"));
$publicKeyFile = file_get_contents('../public.pub');
try{
    $decoded = JWT::decode($jwt->token, new Key($publicKeyFile, 'RS256'));
    echo "Decode:\n" . print_r((array) $decoded, true) . "\n";
}catch(Exception $erro){
    echo $erro;
}
