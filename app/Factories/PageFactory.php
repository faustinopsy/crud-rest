<?php
namespace App\Factories;

class PageFactory {
    public static function getPages($type) {
        switch ($type) {
            case 'administrador':
                return [
                    ["path" => "/painel-admin", "name" => "Painel Administrativo"],
                    ["path" => "/lista-professor", "name" => "Painel de Professores"],
                    ["path" => "/form-aluno", "name" => "Painel de Alunos"]
                ];
            case 'professor':
                return [
                    ["path" => "/lista-professor", "name" => "Painel de Professores"],
                    ["path" => "/form-aluno", "name" => "Painel de Alunos"]
                ];
            case 'aluno':
                return [
                    ["path" => "/form-aluno", "name" => "Painel de Alunos"]
                ];
            default:
                throw new \Exception("Tipo de usuário inválido");
        }
    }
}
?>
