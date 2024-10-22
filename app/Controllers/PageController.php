<?php
namespace App\Controllers;

use App\Factories\PageFactory;

class PageController {
    public function getUserPages($userType) {
        try {
            $pages = PageFactory::getPages($userType);
            return json_encode($pages);
        } catch (\Exception $e) {
            http_response_code(400);
            return json_encode(["error" => $e->getMessage()]);
        }
    }
}
?>
