<?php
namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Pen', 'price' => 2.50, 'description' => 'Blue ink ballpoint pen'],
            ['name' => 'Laptop', 'price' => 1200.00, 'description' => '15-inch high performance laptop'],
            ['name' => 'Book', 'price' => 15.00, 'description' => 'Paperback book'],
            ['name' => 'Notebook', 'price' => 5.00, 'description' => 'A4 lined notebook'],
            ['name' => 'Mouse', 'price' => 25.00, 'description' => 'Wireless mouse'],
            ['name' => 'Keyboard', 'price' => 45.00, 'description' => 'Mechanical keyboard'],
            ['name' => 'Headphones', 'price' => 60.00, 'description' => 'Noise-cancelling headphones'],
            ['name' => 'Charger', 'price' => 20.00, 'description' => 'USB-C charger'],
            ['name' => 'Backpack', 'price' => 40.00, 'description' => 'Laptop backpack'],
            ['name' => 'Smartphone', 'price' => 800.00, 'description' => 'Latest smartphone model'],
            ['name' => 'Tablet', 'price' => 500.00, 'description' => '10-inch tablet'],
            ['name' => 'Water Bottle', 'price' => 10.00, 'description' => '500ml reusable bottle'],
            ['name' => 'Desk Lamp', 'price' => 30.00, 'description' => 'LED desk lamp'],
            ['name' => 'Calculator', 'price' => 15.00, 'description' => 'Scientific calculator'],
            ['name' => 'Chair', 'price' => 100.00, 'description' => 'Ergonomic office chair'],
            ['name' => 'Table', 'price' => 150.00, 'description' => 'Wooden study table'],
            ['name' => 'Monitor', 'price' => 250.00, 'description' => '24-inch LED monitor'],
            ['name' => 'Printer', 'price' => 120.00, 'description' => 'Inkjet printer'],
            ['name' => 'Folder', 'price' => 3.00, 'description' => 'Document folder'],
            ['name' => 'Sticky Notes', 'price' => 2.00, 'description' => 'Pack of sticky notes'],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'name'        => $product['name'],
                'price'       => $product['price'],
                'description' => $product['description'],
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now(),
            ]);
        }
    }
}
