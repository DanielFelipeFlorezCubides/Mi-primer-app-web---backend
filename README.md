# Mi primer app web (backend + frontend)

#### Objetivo

El propósito de este taller es  desarrollar una aplicación Full Stack sencilla con Node.js (Express)para el backend y un frontend que consuma la API creada.

El backend debe seguir buenas prácticas como modularización, uso de variables de entorno, validaciones con express-validator, manejo de CORS y persistencia de datos enMongoDB.

El frontend debe permitir al usuario interactuar con todas las funcionalidades implementadas en el backend.

⚠️ Deben investigar y solucionar el problema de CORS para que el frontend pueda comunicarse con el backend.

El proyecto debe incluir buenas prácticas:

Variables de entorno (dotenv).

Modularización del código (separar rutas, controladores, middlewares, etc.).

Validaciones con express-validator.

Documentación clara en el README.

Video explicativo con todos los miembros mostrando el funcionamiento.

### Temáticas (Escoger UNA de las siguientes)

#### 1. Gestión de Reservas de Canchas Deportivas

Contexto:

Un complejo deportivo quiere que sus clientes puedan reservar canchas de fútbol, baloncesto o tenis para horarios específicos.

Requerimientos mínimos:

Registrar canchas disponibles con: 

nombre

, 

tipo

 (fútbol, baloncesto, tenis), 

precioPorHora

.

Registrar reservas indicando: 

fecha

, 

horaInicio

, 

horaFin

, 

idCancha

, 

nombreCliente

.

Validación: No permitir reservas que se crucen para la misma cancha.

Frontend:

Listar canchas disponibles.

Mostrar disponibilidad en una fecha.

Permitir crear una reserva.

#### 2. Control de Inventario de Tienda de Videojuegos

Contexto:

Una tienda de videojuegos físicos y consolas necesita gestionar su inventario y ventas.

Requerimientos mínimos:

Registrar productos con: 

nombre

, 

tipo

 (juego o consola), 

precio

, 

cantidad

.

Registrar ventas:

Seleccionar producto.

Descontar stock automáticamente.

Validación: No permitir ventas con stock insuficiente.

Frontend:

Listar catálogo de productos.

Simular una compra.

Mostrar mensaje si no hay stock.

#### 3. Gestión de Tareas Colaborativas

Contexto:

Una herramienta para que pequeños equipos gestionen tareas y asignen responsables.

Requerimientos mínimos:

Crear tareas con: 

titulo

, 

descripcion

, 

fechaLimite

, 

responsable

.

Cambiar estado: 

pendiente

, 

en progreso

, 

completada

.

Frontend:

Mostrar tablero de tareas.

Filtrar por estado.

Permitir cambiar estado de una tarea.

### Especificaciones técnicas obligatorias

Backend (Node.js + Express)

Debe estar desarrollado en Node.js con Express.

Uso de MongoDB como base de datos.

Uso de variables de entorno para credenciales y configuración (archivo 

.env

).

Modularización del código (separar rutas, controladores, modelos y configuración).

Validaciones en las rutas usando express-validator.

Manejo adecuado de errores y envío de respuestas con los códigos HTTP correctos.

Configuración de CORS para permitir la conexión desde el frontend.

Documentación en el README con:

Explicación del proyecto.

Requerimientos de instalación.

Variables de entorno necesarias.

Ejemplos de endpoints y cómo probarlos.

Link al repositorio del frontend.

Frontend

Puede realizarse en React, Vue, Angular o cualquier framework/librería que conozcan.

Debe consumir todos los endpoints creados en el backend.

Interfaz amigable para realizar todas las operaciones (crear, leer, actualizar, eliminar).

Mostrar mensajes de validación o error provenientes del backend.

Repositorio separado del backend.

Documentación (README del backend)

Descripción del proyecto y temática elegida.

Tecnologías usadas.

Pasos para instalar y ejecutar.

Ejemplos de endpoints y cómo consumirlos.

Link al repositorio del frontend.

Video de entrega

Duración máxima: 10 minutos.

Deben aparecer todos los integrantes en cámara.

Mostrar brevemente el código del backend.

Mostrar el funcionamiento completo del frontend.