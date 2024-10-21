<?php
namespace App\Controllers;

use App\Factories\FactorySelector;
use Exception;

class PageController {
    public function getUserPages($userType) {
        
        try {
            $factory = FactorySelector::getFactory($userType);
            $page = $factory->createPage();
            $pages = $page->getPages();
            return json_encode($pages);
        } catch (Exception $e) {
            http_response_code(400);
            return json_encode(["error" => $e->getMessage()]);
        }
    }
}
?>
