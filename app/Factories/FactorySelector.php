<?php
namespace App\Factories;

use App\Factories\AdminPageFactory;
use App\Factories\ProfessorPageFactory;
use App\Factories\StudentPageFactory;
use Exception;

class FactorySelector {
    public static function getFactory(string $type): PageFactory {
        switch ($type) {
            case 'administrador':
                return new AdminPageFactory();
            case 'professor':
                return new ProfessorPageFactory();
            case 'aluno':
                return new StudentPageFactory();
            default:
                throw new Exception("Tipo de usuário inválido");
        }
    }
}
?>
