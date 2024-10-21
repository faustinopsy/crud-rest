<?php
namespace App\Factories;

use App\Pages\Page;

abstract class PageFactory {
    abstract public function createPage(): Page;
}
?>
