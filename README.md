# Desafio de nginx.

Primero ejecuta `npm i` para instalar todas las dependencias

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
