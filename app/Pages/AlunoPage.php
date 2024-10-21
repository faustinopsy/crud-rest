<?php
namespace App\Pages;

class AlunoPage implements Page {
    public function getPages(): array {
        return [
            ["path" => "/form-aluno", "name" => "Painel de Alunos"]
        ];
    }
}
?>
