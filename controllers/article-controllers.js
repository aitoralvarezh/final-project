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

        const { title, content, visible } = req.body;

        const schema = joi.object({
            tittle: joi.string().required(),
            content: joi.string().required(),
            visible: joi.boolean(),
        });

        await schema.validateasync({ title, content, visible });

        const userId = req.auth.id;

        const result = await database.pool.query('INSERT INTO articles (title, content, visible, user_id) VALUES (?, ?, ?, ?)', [tittle, content, visible, user])




    } catch (error) {

    }
}

module.exports = {
    getArticles,
    getArticleById,
    createArticles,

}