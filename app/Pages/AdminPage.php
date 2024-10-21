<?php
namespace App\Pages;

class AdminPage implements Page {
    public function getPages(): array {
        return [
            ["path" => "/painel-admin", "name" => "Painel Administrativo"],
            ["path" => "/lista-professor", "name" => "Painel de Professores"],
            ["path" => "/form-aluno", "name" => "Painel de Alunos"]
        ];
    }
}
?>
