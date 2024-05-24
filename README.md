# apuestaTotal
Este proyecto està enfocado en apuestas, donde el cliente se puede contactar con el asesor y a travès de un comprobante de pago puede obtener una recarga de saldo.
El asesor de ventas, por su parte, comprueba de que el depòsito se haya realizado correctamente, para luego realizar la recarga correspondiente.

Actores del Proceso:

Cliente: Individuo que necesita recargar saldo en su cuenta para realizar apuestas en eventos deportivos.
Asesor de Venta: Persona encargada de atender al cliente, recibir el voucher de depósito y realizar la recarga en la cuenta del cliente.
Sistema: La plataforma o sistema informático que facilita la interacción entre el cliente y el asesor de venta, así como la gestión de las recargas de saldo.

Flujo del Proceso:

El cliente contacta al asesor de venta a través de WhatsApp, Telegram o Facebook Messenger para solicitar una recarga de saldo en su cuenta de apuestas.
El asesor de venta recibe la solicitud y obtiene la siguiente información del cliente:
PlayerID
Voucher de Depósito (monto, banco, fecha y hora del depósito, imagen adjunta)
El asesor de venta realiza la recarga en la cuenta del cliente, utilizando la información proporcionada en el voucher de depósito.
Posterior a la recarga, el sistema actualiza el saldo del cliente y lo visualiza para el asesor de venta en su panel de consulta.
El sistema registra el historial de recargas del cliente, incluyendo el monto de las recargas, el medio de comunicación utilizado y el banco utilizado para el depósito.

*** EL DIAGRAMA SE ENCUENTRA EN LA CARPETA RAÌZ DEL PROYECTO ***
El archivo se llama modeloDatos.drawio

Requisitos del Sistema
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu sistema:

PHP >= 7.3
Composer
Node.js y npm
MySQL

Instalación
Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

Clona el repositorio

Instala las dependencias de Laravel:
cd proyecto-clientes-recargas
composer install

Copia el archivo de configuración .env:
cp .env.example .env

Configura la base de datos:

Crea una nueva base de datos MySQL llamada bd_clientes.
Abre el archivo .env y configura las credenciales de tu base de datos

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bd_clientes
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

Ejecuta las migraciones de la base de datos:
php artisan migrate

Instala las dependencias de npm para el frontend:
cd frontend
npm install

Inicia el servidor de desarrollo para el frontend:
npm run dev

Inicia el servidor de desarrollo para Laravel:
php artisan serve

Accede a la aplicación en tu navegador:
Abre tu navegador y visita http://localhost:8000.


