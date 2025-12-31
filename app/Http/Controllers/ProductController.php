<?php
namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Product;

class ProductController extends BaseController
{
    public function index()
    {
        $product = Product::get();

        return $this->sendResponse($product, 'Product list retrieved successfully.');

    }
}
