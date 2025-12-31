# Real-Time Order Management System

## 📌 Project Overview

This is a **Real-Time Order Management System** developed as part of a Laravel practical assessment.  
The application demonstrates backend API development, frontend integration, and real-time communication using WebSockets.

Users can create orders from the frontend, and order status updates are pushed live to the UI without page refresh.

---

## 🛠 Tech Stack

### Backend
- Laravel 12
- PHP 8.5
- MySQL
- Laravel Reverb (WebSockets)
- Laravel Broadcasting & Channels
- Laravel Queues

### Frontend
- React (Laravel inbuilt React + Vite)
- Axios (API communication)
- Material UI (MUI)
- React Router DOM

---

## ⚙️ Environment Requirements

- PHP >= 8.5
- Composer
- Node.js & npm
- MySQL
- Laravel CLI

---

## 🚀 Project Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-folder
composer install
cp .env.example .env
Cofig Your Database
php artisan key:generate
php artisan db:seed --class=ProductSeeder

php artisan serve
npm run dev
php artisan reverb:start
php artisan queue:work

----------------------------------
 **API response examples**
1. Order List (For Admin)
    curl --location 'http://127.0.0.1:8000/api/orders' \
    --data ''

2. Add new order
    curl --location 'http://127.0.0.1:8000/api/orders' \
    --header 'Content-Type: application/json' \
    --data '{
        "user_id": 1,
        "product_id": 10,
        "quantity": 3
    }
    '

3. Update order status
    curl --location --request PUT 'http://127.0.0.1:8000/api/updateStatus/1' \
    --header 'Content-Type: application/json' \
    --data '{
        "order_id": 1,
        "status": "pending"
    }'

4. Product list
    curl --location 'http://127.0.0.1:8000/api/products' \
    --data ''

