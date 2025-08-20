# Frontend
https://github.com/Mateo-Paternina-Mercado/videogame-inventory-frontend

# 🧑‍🎨 Autores
## Backend 
- Daniel Felipe Florez Cubides
- Breyner Fernando Pinto
------------
## Frontend 
- Mateo Paternina Mercado

# 📘 Documentación del Backend — API de Productos

## 🚀 Descripción

Este backend está desarrollado con **Node.js + Express** y **MongoDB** (driver oficial).
Permite administrar productos de tipo **juego** o **consola** con operaciones **CRUD** (crear, leer, actualizar y eliminar).

------

## 📂 Estructura del proyecto

```
Mi-primer-app-web---backend/
│── app.js                 # Punto de entrada
│── package.json
│── .env                   # Variables de entorno
│
├── db/
│   ├── config.js           # Conexión a MongoDB
│   └── dataset.js          # Script para poblar la base de datos
│
├── controllers/
│   └── product.controller.js   # Lógica de negocio
│
├── routers/
│   └── product.routes.js       # Definición de endpoints
│
├── middlewares/
│   └── validate-fields.js      # Validación de campos
```

------

## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio

```
git clone <url-del-repo>
cd Mi-primer-app-web---backend
```

### 2️⃣ Instalar dependencias

```
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz con el siguiente contenido:

```
DB_URI=mongodb://localhost:27017
DB_NAME=videogames_store
PORT=3000
```

### 4️⃣ Poblar la base de datos (dataset inicial)

```
npm test
```

Esto ejecuta `db/dataset.js` y crea una colección `products` con datos de ejemplo.

### 5️⃣ Ejecutar el servidor

```
npm start
```

El servidor corre en:
👉 `http://localhost:3000/api/products`

------

## 📑 Documentación de Endpoints

Todos los endpoints devuelven respuestas en formato **JSON**.
La API gestiona su propio campo `id` (numérico, autoincremental), distinto del `_id` generado por MongoDB.

------

### ➕ Crear un producto

**POST** `/api/products`

#### Request (Body JSON)

```
{
  "nombre": "PlayStation 5 Slim",
  "tipo": "consola",
  "precio": 2200,
  "cantidad": 8
}
```

#### Validaciones

- `nombre` → obligatorio, no vacío
- `tipo` → debe ser `"juego"` o `"consola"`
- `precio` → número mayor a 0
- `cantidad` → entero mayor o igual a 0

#### Response 201 (Created)

```
{
  "message": "Producto creado con éxito",
  "product": {
    "id": 7,
    "nombre": "PlayStation 5 Slim",
    "tipo": "consola",
    "precio": 2200,
    "cantidad": 8,
    "createdAt": "2025-08-19T13:20:52.546Z"
  }
}
```

#### Response 400 (Validación fallida)

```
{
  "errors": [
    { "msg": "El tipo debe ser 'juego' o 'consola'", "param": "tipo", "location": "body" }
  ]
}
```

------

### 📋 Listar todos los productos

**GET** `/api/products`

#### Response 200

```
[
  {
    "id": 1,
    "nombre": "The Legend of Zelda: Tears of the Kingdom",
    "tipo": "juego",
    "precio": 70,
    "cantidad": 15
  },
  {
    "id": 2,
    "nombre": "PlayStation 5",
    "tipo": "consola",
    "precio": 499,
    "cantidad": 8
  }
]
```

------

### 🔎 Obtener un producto por ID

**GET** `/api/products/:id`

#### Ejemplo

```
GET http://localhost:3000/api/products/2
```

#### Response 200

```
{
  "id": 2,
  "nombre": "PlayStation 5",
  "tipo": "consola",
  "precio": 499,
  "cantidad": 8
}
```

#### Response 404

```
{ "message": "Producto no encontrado" }
```

------

### ✏️ Actualizar un producto

**PUT** `/api/products/:id`

#### Ejemplo

```
PUT http://localhost:3000/api/products/6
```

#### Request (Body JSON)

```
{
  "precio": 2100,
  "cantidad": 5
}
```

> ⚠️ Los campos son opcionales, pero si se envían deben cumplir validación.

#### Response 200

```
{ "message": "Producto actualizado con éxito" }
```

#### Response 404

```
{ "message": "Producto no encontrado" }
```

------

### 🗑️ Eliminar un producto

**DELETE** `/api/products/:id`

#### Ejemplo

```
DELETE http://localhost:3000/api/products/6
```

#### Response 200

```
{ "message": "Producto eliminado con éxito" }
```

#### Response 404

```
{ "message": "Producto no encontrado" }
```

------

## ⚠️ Errores comunes

- `404 Producto no encontrado` → El `id` no existe en la colección.
- `400 Validación fallida` → Algún campo no cumple con las reglas (`express-validator`).
- `500 Error en el servidor` → Error inesperado (ej. DB no conectada).

------

## 🔧 Notas técnicas

- **IDs autoincrementales**: Se calculan al insertar un nuevo producto (buscando el último y sumando 1).
- **Validaciones**: Se usan middlewares de `express-validator` + `validate-fields.js`.
- **CORS**: Está habilitado globalmente (`app.use(cors())`).
- **Respuestas**: Siempre en JSON con mensajes claros y status HTTP adecuados (`200`, `201`, `400`, `404`, `500`).
--------------------------

# 📂 Endpoints ventas disponibles

🔹 Base URL
http://localhost:3000/v1/sales

## 1. Crear una venta

POST /sales

📌 Descripción: Registra una nueva venta y descuenta el stock del producto.
```json
✅ Body (JSON requerido):
{
  "productId": "64a1b2c3d4e5f6a7b8c9d0e1",
  "quantity": 2,
  "customerName": "Juan Pérez"
}
```
🔎 Validaciones:

productId: debe ser un ObjectId válido de MongoDB.

quantity: entero ≥ 1.

customerName: mínimo 2 caracteres.
```json
📤 Respuestas:

201 (Created)

{
  "message": "Venta creada",
  "sale": {
    "_id": "64a2b3c4d5e6f7g8h9i0j1k2",
    "productId": "64a1b2c3d4e5f6a7b8c9d0e1",
    "quantity": 2,
    "totalPrice": 50000,
    "customerName": "Juan Pérez",
    "createdAt": "2025-08-18T20:15:30.000Z"
  }
}
```

400 (Bad Request) → Errores de validación.

404 (Not Found) → Producto no encontrado.

500 (Server Error) → Error interno.

## 2. Obtener todas las ventas

GET /sales

📌 Descripción: Retorna todas las ventas registradas con información del producto asociado.
```json
📤 Respuesta exitosa (200):
[
  {
    "_id": "64a2b3c4d5e6f7g8h9i0j1k2",
    "productId": { "name": "Camiseta", "price": 25000 },
    "quantity": 2,
    "totalPrice": 50000,
    "customerName": "Juan Pérez",
    "createdAt": "2025-08-18T20:15:30.000Z"
  }
]
```
❌ Errores:

500 (Server Error) → Error interno al consultar las ventas.

🛠️ Tecnologías usadas

Node.js + Express → Backend.

MongoDB + Mongoose → Base de datos.

express-validator → Validación de datos.

CORS → Permite conexión con frontend.

dotenv → Variables de entorno.

📌 Notas para el Frontend

Siempre enviar Content-Type: application/json en las peticiones POST.

Manejar mensajes de error devueltos por el backend (400, 404, 500).

El campo createdAt lo genera el backend automáticamente (no enviarlo).
