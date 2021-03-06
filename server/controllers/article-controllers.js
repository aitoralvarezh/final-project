const { database } = require('../structure');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path')


// 1. Get articles ------------------------------------------------------------------------------------------------------|

async function getArticles(req, res) {
    try {
        const [articles] = await database.pool.query('SELECT * FROM articles WHERE visible = true ORDER BY date DESC')
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

        const [articles] = await database.pool.query(`
            SELECT user_id, topic_id, title, content , visible, articles.image, users.image as userimage, name FROM articles 
            JOIN users ON articles.user_id = users.id 
            WHERE articles.id = ?;`, id);

        res.send(articles);

    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}

// 3. Create article-----------------------------------------------------------------------------------------------------|

async function createArticles(req, res) {
    try {
        const { id } = req.auth;
        let { title, content, visible, topicId } = req.body;

        visible = (visible === '1')

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

        const [createArticle] = await database.pool.query(`INSERT INTO articles 
        (user_id, topic_id, title, content, visible) 
        VALUES (?, ?, ?, ?, ?)`,
            [id, topicId, title, content, visible])

        const createId = createArticle.insertId;

        let imageName;

        if (req.file) {
            imageName = 'article-image-' + createId;
            await fs.writeFile(path.join('uploads', imageName), req.file.buffer)
            imageName = ('http://localhost:3000/static/' + imageName);
        }

        if (imageName) {
            await database.pool.query('UPDATE articles SET  image = ? WHERE id = ?',
                [imageName, createId])

        }

        const selectQuery = await database.pool.query('SELECT * FROM articles WHERE id = ?', createId);

        res.status(201);
        res.send(selectQuery[0]);
    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}

// 4. Get article by topic-----------------------------------------------------------------------------------------------------|
async function getArticlesByTopic(req, res) {
    try {
        //--Devuelve los topics que el usuario sigue
        const { id } = req.auth;

        const selectQuery = await database.pool.query(`SELECT * from articles 
            WHERE topic_id 
            IN (SELECT topic_id FROM users_and_topics 
            WHERE user_id = ? AND visible = true)
            ORDER BY date DESC`, id);

        res.status(201);
        res.send(selectQuery[0]);

    } catch (error) {
        console.log(error)
        res.status(500)
        res.send({
            error: error.message
        })
    }
}

// 5. Get article by user-----------------------------------------------------------------------------------------------------|
async function getArticlesByUser(req, res) {
    try {
        //--Devuelve los topics que el usuario sigue
        const { id } = req.auth;

        const selectQuery = await database.pool.query(`SELECT * from articles 
            WHERE user_id = ?
            ORDER BY date DESC`, id);

        res.status(201);
        res.send(selectQuery[0]);

    } catch (error) {
        res.status(500)
        res.send({ error: error.message })
    }
}
// 6. Read article related to a topic--------------------------------------------------------------------------------------------|
async function readArticlesByTopic(req, res) {
    try {
        //--Devuelve los articulos con el tema seleccionado
        const { id } = req.params

        const selectQuery = await database.pool.query(`SELECT * from articles 
            WHERE topic_id = ? AND visible = true
            ORDER BY date DESC`, id);

        res.status(201);
        res.send(selectQuery[0]);
    } catch (error) {
        res.status(500)
        res.send({
            error: error.message
        })
    }
}

// 7. Edit article-----------------------------------------------------------------------------------------------------|
async function editArticles(req, res) {
    try {
        const { id } = req.params;

        let { title, content, visible } = req.body;

        visible = (visible === '1')

        const schema = joi.object({
            title: joi.string().required(),
            content: joi.string().required(),
            visible: joi.boolean()
        });

        await schema.validateAsync({ title, content, visible });

        let imageName;

        if (req.file) {
            imageName = 'article-image-' + id;
            await fs.writeFile(path.join('uploads', imageName), req.file.buffer)
            imageName = ('http://localhost:3000/static/' + imageName);
        }

        if (imageName) {

            await database.pool.query('UPDATE articles SET title = ?, image = ?, content = ?, visible = ? WHERE id = ?',
                [title, imageName, content, visible, id]);

        } else {
            await database.pool.query('UPDATE articles SET title = ?, content = ?, visible = ? WHERE id = ?',
                [title, content, visible, id]);
        }

        const selectQuery = await database.pool.query('SELECT * FROM articles  WHERE id = ?', id);

        res.status(201);
        res.send(selectQuery[0]);
    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}

//8. Edit article visibility -----------------------------------------------------------------------------------------------------|
async function editArticleStatus(req, res) {
    try {
        const { id } = req.params;

        let { visible } = req.body;

        visible = (visible === '1' || visible === true)

        const schema = joi.object({
            visible: joi.boolean()
        });
        await schema.validateAsync({ visible });

        await database.pool.query('UPDATE articles SET visible = ? WHERE id = ?', [visible, id]);

        const selectQuery = await database.pool.query('SELECT * FROM articles  WHERE id = ?', id);

        res.status(201);
        res.send(selectQuery[0]);
    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}
// 9. Delete article-----------------------------------------------------------------------------------------------------|
async function deleteArticle(req, res) {
    try {
        const { id } = req.body;

        const deleteArticle = await database.pool.query('DELETE FROM articles WHERE id = ?', id);
        res.send(deleteArticle[0]);
    }
    catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}


module.exports = {
    getArticles,
    getArticleById,
    createArticles,
    getArticlesByTopic,
    getArticlesByUser,
    readArticlesByTopic,
    editArticles,
    editArticleStatus,
    deleteArticle,
}