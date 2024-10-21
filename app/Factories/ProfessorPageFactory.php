<?php
namespace App\Factories;

use App\Pages\ProfessorPage;
use App\Pages\Page;

class ProfessorPageFactory extends PageFactory {
    public function createPage(): Page {
        return new ProfessorPage();
    }
}
?>
