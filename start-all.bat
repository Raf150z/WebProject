@echo off
echo Iniciando todos los servicios...

start cmd /k "cd backend-laravel && php artisan serve --port=8000"
timeout /t 3

start cmd /k "cd backend-codeigniter && php spark serve --port=8001"
timeout /t 3

start cmd /k "cd microservice-node && npm start"
timeout /t 3

start cmd /k "cd frontend-angular && ng serve"
echo Todos los servicios iniciados!
pause