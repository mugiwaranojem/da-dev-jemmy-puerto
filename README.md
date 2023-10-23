## Pre-requisite
* PHP 7.4 or greater installed on local
* Mysql 8 or higher
* Composer version 2.0.14 or higher
* node v16.16.0 or higher

## Stacks
* Laravel Framework 8.83.27
* ReactJs
* Bootstrap
* Mysql 8

### Setup Instructions
* git clone https://github.com/mugiwaranojem/da-dev-jemmy-puerto.git todolist
* Go to app directory and run composer install
  - ```cd todolist && composer install```
* Create database in mysql client with DB name ``dev_test_db``
  - ```mysql> create database dev_test_db;```
* Initialize .env file and update database credentials, mysql username, password, port
  - ```cp .env.example .env```
  - DB_HOST=127.0.0.1
  - DB_PORT=3306
  - DB_DATABASE=dev_test_db
  - DB_USERNAME=root
  - DB_PASSWORD=root
* Initialize App generate key, run migration and Run the PHP application
  - ```php artisan key:generate```
  - ```php artisan migrate```
  - ```php artisan serve```
* Open new terminal go to app directory and initialize frontend
  - ```npm install```
  - ```npm run watch```
* Open app in the browser and start viewing, adding, marking and deleting todo app
  - http://localhost:8000/
