<?php
namespace App\Rotas;

use App\Controllers\UsuarioController;
class Rotas {
    public static function fastRotas(){
        return [
            'GET' => [
                '/users' => [UsuarioController::class, 'read'],
                '/users/{id}' => [UsuarioController::class, 'read'],
            ],
            'POST' => [
                '/users' => [UsuarioController::class, 'create'],
                '/login' => [UsuarioController::class, 'login'],
            ],
            'PUT' => [
               '/users/{id}' => [UsuarioController::class, 'update'],
            ],
            'DELETE' => [
                '/users/{id}' => [UsuarioController::class, 'delete'],
            ],
        ];
    }
}

