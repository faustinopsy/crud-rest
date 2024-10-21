<?php
namespace App\Factories;

use App\Pages\StudentPage;
use App\Pages\Page;

class AlunoPageFactory extends PageFactory {
    public function createPage(): Page {
        return new AlunoPage();
    }
}
?>
