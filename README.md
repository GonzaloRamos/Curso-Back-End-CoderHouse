# Rutas

## Produtocs

`/api/productos/:id?` Metodo GET devuelve todos los productos o el que se le pasa por ID
`/api/productos/save` Metodo POST crea un producto. Acepta: title, price, image (solo URL)
`/api/productos/:id` Metodo Put actualiza un producto.
`/api/productos/:id` Metodo DELETE elimina un producto.

## Sitio web

`/` Lleva a `/home` si el usuario esta autenticado.
`/login` Página de login.
`/register` Página de registro

# Inicia el proyecto.

Primero ejecutar `npm i` para instalar todas las dependencias
En los scripts se puede pasar como argumento PORT
`npm run start` Ejecuta el archivo index.js
`npm run start-dev` Ejecuta el archivo index.js con nodemon.
`npm run start-fork` Ejecuta el servidor con el módulo pm2 en modo fork
`npm run start-cluster` Ejecuta el servidor con el módulo pm2 en modo cluster
`npm run test` Ejecuta pruebas sobre el servidor con artilery. Se configura en benchmark.js
`npm run test-profiling` Ejecuta pruebas sobre el servidor con node profiling.

# Desafio de nginx.

Para iniciar el servidor:

`npm run start-dev. // Inicia con nodemon y modo cluster`

Parámetros necesarios para inicar:

```markdown
--require dotenv/config
--port= <port> // Default 8080
--mode='<cluster | fork>' // Default Fork
```

Para ejectuar el servidor con forever:
`npx forever start --watch indexjs ` + parámetros disponibles. Ejemplo `--port=3000`
`npx forever list` para listar procesos en forever

Para ejecutar el servidor con pm2:

`npm run fork` inicia el servidor en modo fork.
`npm run cluster` inicia el servidor en modo cluster.

# Desafio Loggers

Para ejecutar una compresion en la ruta /info, se tiene que mandar como parámetro `compress=true`. Ejemplo:

`localhost:PORT/info/?compress=true`.

Por default, no comprime.

## Test de pruebas.

### Test con artillery y node profiling

Para iniciar test de pruebas, correr el script: `npm run profiling`. Se inicia node JS en modo profiling.

Para ejecutar test de prueba con artillery:

` artillery quick --count 50 -n 20 '<URL>' > <OUTPUTFILE>`.

Para analizar el archivo creado por NODE en el modo profile, ejecutar el comando:

`node --prof-process <Node created file>.log > <OUTPUTFILE>`.

### Test con autocanon y 0x

1. Se inicia el servidor con 0x ejecutando: `npm run start0x`.
2. En el archivo benchmark.js tenemos una función desde podemos aplicar a la URL en el que hacer las pruebas:`run(<URL>)`. Para configurar los parámetros del test modificar:` const inst = autocannon({ url, connections: 100, duration: 20 })`
3. Ejecutar el comando `npm run test`. Que va a ejecutar el archivo benchmark.js
4. Apagar el servidor y ejecutar el archivo HTML de la carpeta creada que contiene el benchmark realizado con autocannon
