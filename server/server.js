require('dotenv').config();
const { usersControllers, articleControllers, topicsControllers, commentsControllers } = require('./controllers');
const { validateAuthorization, optionalValidation } = require('./middlewares');
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
app.post('/api/register', usersControllers.createUser);
app.post('/api/login', usersControllers.login);
app.put('/api/users/me', upload.single('image'), validateAuthorization, usersControllers.editProfile);
app.put('/api/users/chanhepassword', validateAuthorization, usersControllers.changePassword)
app.delete('/api/users/deleteaccount', validateAuthorization, usersControllers.deleteProfile)
app.put('/api/users/topics', validateAuthorization, usersControllers.selectTopics)
app.delete('/api/users/topics', validateAuthorization, usersControllers.deleteFollowingTopic)




// ---Temas.

app.post('/api/topics/', validateAuthorization, topicsControllers.addTopic);
app.get('/api/topics', optionalValidation, topicsControllers.getTopics);
app.put('/api/topics/:id', validateAuthorization, topicsControllers.editTopics);

// ---Artículos.

app.get('/api/topics/:id', articleControllers.readArticlesByTopic)
app.post('/api/articles/writearticle', upload.single('image'), validateAuthorization, articleControllers.createArticles);
app.get('/api/articles/following',validateAuthorization, articleControllers.getArticlesByTopic)
app.get('/api/articles/read/:id', articleControllers.getArticleById);
app.get('/api/articles/myarticles', validateAuthorization, articleControllers.getArticlesByUser)
app.get('/api/articles', articleControllers.getArticles);
app.put('/api/myarticles/status/:id', validateAuthorization, articleControllers.editArticleStatus);
app.put('/api/myarticles/edit/:id', upload.single('image'), validateAuthorization, articleControllers.editArticles);
app.delete('/api/articles/detelearticle/:id', validateAuthorization, articleControllers.deleteArticle)





// ---Comentarios.









// 3. Puerto

app.listen(HTTP_PORT, () => console.log(`escuchando en el puerto ${HTTP_PORT}`));

