<?php
namespace App\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\SignatureInvalidException;
use Exception;

class TokenController {
    private $algoritimo;
    private $secret;
    
    public function __construct() {
        $this->algoritimo = 'HS256';
        $this->secret = '122333zxxxassss';
    }
    public function extrairToken(){
        $headers = getallheaders();
        
        if (!isset($headers["Authorization"])) {
            echo json_encode(["message" => "Token não fornecido."]);
            http_response_code(401);
            exit();
        }

        $jwt = explode(" ", $headers["Authorization"]);
        
        if (count($jwt) !== 2) {
            echo json_encode(["message" => "Formato do token inválido."]);
            http_response_code(401);
            exit();
        }
        return $jwt[1];
    }
    public function gerarToken($tipo, $paginas) {
        $payload = [
            'iss' => 'http://localhost:8000',
            'aud' => 'http://localhost:8000',
            'iat' => time(),
            'nbf' => time(),
            'exp' => time() + (60 * 60 * 24), 
            'tipo' => $tipo,
            'paginas' => $paginas
        ];

        try {
            $jwt = JWT::encode($payload, $this->secret, $this->algoritimo);
            return $jwt;
        } catch (Exception $e) {
            echo json_encode(["message" => "Erro ao gerar token: " . $e->getMessage()]);
            http_response_code(500);
            exit();
        }
    }
    public function tipoUser(){
       $token =  $this->extrairToken();
        try {
            $decoded = JWT::decode( $token, new Key($this->secret, $this->algoritimo));
            return $decoded->tipo; 

        } catch (ExpiredException $e) {
            echo json_encode(["message" => "Token expirado: " . $e->getMessage()]);
            http_response_code(401);
            exit();

        }
    }
    public function validarToken() {
        $token =  $this->extrairToken();
        
        try {
            $decoded = JWT::decode($token, new Key($this->secret, $this->algoritimo));
            //return $decoded->tipo; 

        } catch (ExpiredException $e) {
            echo json_encode(["message" => "Token expirado: " . $e->getMessage()]);
            http_response_code(401);
            exit();

        } catch (BeforeValidException $e) {
            echo json_encode(["message" => "Token ainda não é válido: " . $e->getMessage()]);
            http_response_code(401);
            exit();

        } catch (SignatureInvalidException $e) {
            echo json_encode(["message" => "Assinatura do token inválida: " . $e->getMessage()]);
            http_response_code(401);
            exit();

        } catch (Exception $e) {
            echo json_encode(["message" => "Erro ao validar token: " . $e->getMessage()]);
            http_response_code(401);
            exit();
        }
    }
}
