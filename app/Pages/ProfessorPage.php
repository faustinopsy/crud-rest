<?php
namespace App\Pages;

class ProfessorPage implements Page {
    public function getPages(): array {
        return [
            ["path" => "/lista-professor", "name" => "Painel de Professores"],
            ["path" => "/form-aluno", "name" => "Painel de Alunos"]
        ];
    }
}
?>
