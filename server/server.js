require('dotenv').config();
const { usersControllers, articleControllers, topicsControllers, commentsControllers } = require('./controllers');
const { validateAuthorization } = require('./middlewares');
const { HTTP_PORT } = process.env;

// 1. Modulos requeridos.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();

const upload = multer();

app.use('/static', express.static('uploads'))


app.use(cors());
app.use(bodyParser.json());





// 2. Rutas de peticiones.


// ---Usuarios.

app.get('/api/users', usersControllers.getUsers);
/* app.get('/api/users/:id', usersControllers.getUserById);*/
app.post('/api/register', usersControllers.createUser);
app.post('/api/login', usersControllers.login);
app.put('/api/users/me', upload.single('image'), validateAuthorization, usersControllers.editProfile);
app.put('/api/users/chanhepassword', validateAuthorization, usersControllers.changePassword)
app.delete('/api/users/deleteaccount', validateAuthorization, usersControllers.deleteProfile)



// ---Temas.

app.post('/api/topics/', validateAuthorization, topicsControllers.addTopic);
app.get('/api/topics', topicsControllers.getTopics);
app.put('/api/topics/:id', validateAuthorization, topicsControllers.editTopics);

// ---Artículos.

app.get('/api/articles', articleControllers.getArticles);
app.get('/api/articles/:id', articleControllers.getArticleById);
app.post('/api/articles/writearticle/', validateAuthorization, articleControllers.createArticles);
app.get('/api/articles/topic/:id', articleControllers.getArticlesByTopic)



// ---Comentarios.









// 3. Puerto

app.listen(HTTP_PORT, () => console.log(`escuchando en el puerto ${HTTP_PORT}`));

