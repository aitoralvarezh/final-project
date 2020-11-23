// 1. Modulos requeridos.
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const { usersControllers, articleControllers, topicsControllers, commentsControllers } = require('./controllers');

const { validateAuthorization } = require('./middlewares');
 
const { HTTP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());





// 2. Rutas de peticiones.


// ---Usuarios.

app.get('/api/users', usersControllers.getUsers);
/* app.get('/api/users/:id', usersControllers.getUserById);*/
app.post('/api/users', usersControllers.createUser);
app.post('/api/users/login', usersControllers.login);
app.put('/api/users/profile', validateAuthorization, usersControllers.editProfile);
app.put('/api/users/info/:id', validateAuthorization, usersControllers.editInfo)
app.delete('/api/users', validateAuthorization, usersControllers.deleteProfile)



// ---Temas.

app.post('/api/topics', topicsControllers.addTopic);
app.get('/api/topics', topicsControllers.getTopics);
app.put('/api/topics/:id', topicsControllers.editTopics);

// ---Artículos.

app.get('/api/articles', articleControllers.getArticles);
app.get('/api/articles/:id', articleControllers.getArticleById)


// ---Comentarios.









// 3. Puerto

app.listen(HTTP_PORT, () => console.log(`escuchando en el puerto ${HTTP_PORT}`));

