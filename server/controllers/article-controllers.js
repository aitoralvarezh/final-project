const { database } = require('../structure');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




// 1. Get articles ------------------------------------------------------------------------------------------------------|

async function getArticles(req, res) {
    try {
        const [articles] = await database.pool.query('SELECT * FROM articles')
        res.send(articles)
    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}

// 2. Get article by ID---------------------------------------------------------------------------------------------------|

async function getArticleById(req, res) {
    try {
        const { id } = req.params;

        const [articles] = await database.pool.query('SELECT * FROM articles WHERE id = ?', id);

        if (article.lenght === 0) {
            const error = new Error('el artículo que buscas no existe o ha sido eliminado por el usuario.');
            error.code = 404;
            throw error;
        }
        res.send(articles[0]);

    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}

// 3. Create article-----------------------------------------------------------------------------------------------------|

async function createArticles(req, res) {
    try {
        const { id } = req.auth;
        console.log('vista:', req.auth);
        const { title, content, visible, topicId } = req.body;

        const schema = joi.object({
            title: joi.string().required(),
            content: joi.string().required(),
            visible: joi.boolean(),
            topicId: joi.required()

        });

        await schema.validateAsync({ title, content, visible, topicId });

        const selectTopic = await database.pool.query('SELECT * FROM topics WHERE id = ?', topicId);


        if (selectTopic.length === 0) {
            const error = new Error('El tema seleccionado no existe');
            error.code = 404;
            throw error;
        }


        let imageName;
        let createId;

        if (req.file) {
            imageName = 'article-' + id + '-' + req.file.originalname;
            await fs.writeFile(path.join('uploads', imageName), req.file.buffer)
            imageName = ('http://localhost:3000/static/' + imageName);
        }

        if (imageName) {

            const [createArticle] = await database.pool.query(`INSERT INTO articles 
            (user_id, topic_id, image, title, content, visible) 
            VALUES (?, ?, ?, ?, ?, ?)`,
                [id, topicId, title, content, visible])
            createId = createArticle.insertId;
        } else {
            const [createArticle] = await database.pool.query(`INSERT INTO articles 
            (user_id, topic_id, title, content, visible) 
            VALUES (?, ?, ?, ?, ?)`,
                [id, topicId, title, content, visible])
            createId = createArticle.insertId;

        }



        const selectQuery = await database.pool.query('SELECT * FROM articles WHERE id = ? ', createId);

        res.status(201);
        res.send(selectQuery[0]);
    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}


async function getArticlesByTopic(req, res) {
    try {

        const { id: topicId } = req.params;

        const [selectQuery] = await database.pool.query('SELECT * FROM articles WHERE topic_id = ?', topicId);

        res.status(201);
        res.send(selectQuery);

    } catch (error) {
        console.log(error)
        res.status(500)
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    getArticles,
    getArticleById,
    createArticles,
    getArticlesByTopic

}