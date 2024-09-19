<?php

require_once '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJleGFtcGxlLm9yZyIsImF1ZCI6ImV4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDB9.YCeuVFL4eOLoqvBCEJ5-JTByrz6WjLF_Uix6P6qNgAD2a9-voKIL3ROmBuiZl1FqZVlG0od3CJ2LEf33sQsGmjnFdGQDVWd3qEuMzwruismd8tklAHvi0xgW1KpTWbKMw2Na23kUcP2Tel60AsMtvpZ06F53U4YAq67NS6EK0IksME-3-xa2OLY3cdOQJpYP6JtvYx2zVC6MfSehXbn-6KXGLoBdFE8wASPa4gJKNkUE23JID8i9KgOp7takvzXRIAKztNBTp4E8PHGjBzxUl-mJ3CWhThg9MtEjrasnQcwsHZt7iw9WFCjvk-oVu28yFPM05C3mdEmBILmrsGYf1KaE31LfTUJytToNMOFLhp1vw8XjNIicwBpC8nZ0fZMb4VkgD7kvHK2pUE7O2v70cAjlaTvG7Ctsh7DeGUKyU985Wyz7a3x9Yoi831q8mLQz9Azz16z-1KW5sSJ_3gsBj3SkMeEVBeW_aC7giR5zLJ2YR-I3xIi6c3fQkEMEF72b";
$publicKeyFile = file_get_contents('../public.pub');

$decoded = JWT::decode($jwt, new Key($publicKeyFile, 'RS256'));
echo "Decode:\n" . print_r((array) $decoded, true) . "\n";