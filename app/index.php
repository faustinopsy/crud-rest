<?php
namespace App;

require_once "../vendor/autoload.php";

use App\Controller\UsuarioController;
use App\Model\Usuario;

$model = new Usuario();
$controller = new UsuarioController($model);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$resposta = null;

switch($method){
    case 'GET':
            if(preg_match('/\/users\/(\d+)/', $uri, $match)){
                $id = $match[1];
                $data = json_decode(file_get_contents('php://input'));
                $controller->read($id);
                break;
            }else{
                $controller->read();
            }
    break;
    case 'POST':
                $data = json_decode(file_get_contents('php://input'));
                $controller->create($data);
    break;
    case 'PUT':
            if(preg_match('/\/users\/(\d+)/', $uri, $match)){
                $id = $match[1];
                $data = json_decode(file_get_contents('php://input'));
                $controller->update($id, $data);
            }
    break;
    case 'DELETE':
            if(preg_match('/\/users\/(\d+)/', $uri, $match)){
                $id = $match[1];
                $controller->delete($id);
            }
    break;
    default:
    echo json_encode(["Método invalido"]);
}