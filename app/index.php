<?php
require "../vendor/autoload.php";

use App\Controller\UsuarioController;
use App\Model\Usuario;


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$model = new Usuario();
$controller = new UsuarioController($model);
$resposta = null;


switch($method){
    case 'GET':
        switch($uri){
            case '/users':
                if(preg_match('/\/users\/(\d+)/', $uri, $match)){
                    $id = $match[1];
                    $data = json_decode(file_get_contents('php://input'));
                    $controller->read($id);
                    break;
                }else{
                    $controller->read();
                }
        break;
           
            default:
                echo json_encode(["URI invalido"]);
        }
    break;
    case 'POST': 
        switch($uri){
            case '/users':
                $data = json_decode(file_get_contents('php://input'));
                $controller->create($data);
                break;

            default:
                echo json_encode(["URI invalido"]);
        }
    break;
    case 'PUT': 
        case '/users':
            if(preg_match('/\/users\/(\d+)/', $uri, $match)){
                $id = $match[1];
                $data = json_decode(file_get_contents('php://input'));
                $controller->update($id, $data);
                break;
            }
    break;
    case 'DELETE':
        case '/users':
            if(preg_match('/\/users\/(\d+)/', $uri, $match)){
                $id = $match[1];
                $controller->delete($id);
                break;
            }
    break;
    default:
    echo json_encode(["Método invalido"]);
}