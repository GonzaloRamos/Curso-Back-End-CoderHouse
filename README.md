# Proyecto Final - Programación Backend CoderHouse.

## Para inicializar el proyecto:

Agregar el dentro del script de inicialización `--require dotenv/config index.js`.
Se usa dotenv para leer variables de entorno.

---

## Uso

### Carrito api

Url base para peticiones de servicio al Carrito de compras: `localhost:PORT/api/carrito/`

.get("/:idCarrito/productos") ==> Retorna los productos del carrito segun ID

.post("/") ==> Crea un carrito y devuelve su estructura con ID

.post(""/:idCarrito/productos/:idProducto) ==> Crea un producto dentro del carrito segun su ID.

.detele("/idCarrito") ==> Elimina todo el carrito

.delete("/idCarrito") ==> Elimina un producto específico dentro del carrito

Ejemplo de información retornada

`{ "message": "Se creo el carrito con exito", "carritoData": { "timeStamp": 1645559565601, "productos": [], "id": "Q5VQljuK9q4JRuKnoGpX" }, "serverStatus": 200 }`

### Productos api

Url base para peticiones de servicio al Carrito de compras: `localhost:PORT/api/productos/`

.get("/:id?") ==> Retorna un producto segun un ID o retorna todos si no se le da ninguno

.post("/") ==> Agrega un producto a la base de datos y lo retorna

.put("/:idProducto") ==> Actualiza los campos de un producto segun su ID.

.delete("/:idProducto") ==> Elimina un producto segun su ID

Ejemplo de información retornada

`{ "message": "Se encontraron todos los productos de la coleccion", "productos": [ { "id": "qekkZDZaYFl0Uj8sYzxM", "fotoUrl": "https://pae-web.presonusmusic.com/uploads/products/media/images/eris_e...", "precio": 5431, "timeStamp": 1645557055485, "descripcion": "Ideal para el home studio", "codigo": 365, "stock": 10, "nombre": "Presonus Eris 7"} ], "serverStatus": 200 }`
