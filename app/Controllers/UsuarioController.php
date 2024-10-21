<?php
namespace App\Controllers;

use App\Model\Usuario;

class UsuarioController {
    private $user;

    public function __construct() {
        $this->user = new Usuario();
    }
    public function create($data) {
        if (!isset($data->nome, $data->email, $data->senha)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do usuário."]);
            return;
        }
        $usuarioExistente = $this->user->getUsuarioByEmail($data->email);
        if ($usuarioExistente) {
            http_response_code(409);
            echo json_encode(["error" => "Um usuário com esse e-mail já existe."]);
            return;
        }

        $this->user->setNome($data->nome)->setEmail($data->email)->setSenha($data->senha);
        if ($this->user->insertUsuario($this->user)) {
            http_response_code(201);
            echo json_encode(["success"=> true,"message" => "Usuário criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar usuário."]);
        }
    }
    public function login($data) {
        if (!isset($data->email, $data->senha)) {
            http_response_code(400);
            echo json_encode(["error" => "Email e senha são necessários para o login."]);
            return;
        }
    
        $usuario = $this->user->getUsuarioByEmail($data->email);
        if ($usuario && password_verify($data->senha, $usuario['senha'])) {
            unset($usuario['senha']);
            $controller = new PageController();
            $telas = $controller->getUserPages($usuario['tipo']);
            http_response_code(200);
            echo json_encode(["message" => "Login bem-sucedido.",
             "usuario" => [
                "usuario_id" => $usuario['usuario_id'],
                "nome" => $usuario['nome'],
                "email" => $usuario['email'],
                "tipo" => $usuario['tipo'],
                "paginas" => $telas
            ]]);
        } else {
            http_response_code(401); 
            echo json_encode(["error" => "Email ou senha inválidos."]);
        }
    }
    public function read($id = null) {
        if ($id) {
            $result = $this->user->getUsuarioById($id);
            if($result){
                unset($result['senha']);
                $status = 200 ;
            }else{
                $status = 404;
            }
            
        } else {
            $result = $this->user->getAllUsuarios();
            foreach ($result as &$usuario) {
                unset($usuario['senha']);
            }
            unset($usuario);
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhum usuário encontrado."]);
    }

    public function update($id, $data) {
        if (!isset($id, $data->nome, $data->email, $data->senha)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do usuário."]);
            return;
        }

        $this->user->setUsuarioId($id)->setNome($data->nome)->setEmail($data->email)->setSenha($data->senha);

        if ($this->user->updateUsuario($this->user)) {
            http_response_code(200);
            echo json_encode(["message" => "Usuário atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar usuário."]);
        }
    }

    public function delete($id) {
        if ($this->user->deleteUsuario($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Usuário excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir usuário."]);
        }
    }
}
