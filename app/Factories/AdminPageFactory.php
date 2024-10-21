<?php
namespace App\Factories;

use App\Pages\AdminPage;
use App\Pages\Page;

class AdminPageFactory extends PageFactory {
    public function createPage(): Page {
        return new AdminPage();
    }
}
?>
