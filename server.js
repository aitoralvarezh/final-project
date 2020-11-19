// 1. Modulos requeridos.
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const { usersControllers, articleControllers, topicsControllers, commentsControllers } = require('./controllers');

/* const { validateAuthotisation } = require('./middlewares'); */

const { HTTP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());





// 2. Rutas de peticiones.


// ---Usuarios.

app.get('/api/users', usersControllers.getUsers);
app.post('/api/users', usersControllers.createUser);
app.post('/api/users/login', usersControllers.login)
app.put('/api/users/:id', usersControllers.editProfile)



// ---Temas.

app.post('/api/topics', topicsControllers.addTopic);
app.get('/api/topics', topicsControllers.getTopics)

// ---Artículos.



// ---Comentarios.









// 3. Puerto

app.listen(HTTP_PORT, () => console.log(`escuchando en el puerto ${HTTP_PORT}`));

