
const { database } = require('../structure');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path')



// 1. Crear nuevo tema.----------------------------------------------------------------------------------------------|
async function addTopic(req, res) {
    try {
        const { id } = req.auth;
        const { name, description, tag } = req.body;
        const topicSchema = joi.object({
            name: joi.string(),
            description: joi.string().max(300),
            tag: joi.string().required()
        });
        await topicSchema.validateAsync({ name, description, tag })
        
        const [noRepeat] = await database.pool.query('SELECT * FROM topics WHERE tag = ?', tag)
        if (noRepeat.length) {
            const error = new Error('Ya existe un tema asociado a ese tag');
            error.code = 409;
            throw error
        }
        
                const insertQuery = 'INSERT INTO topics(name, description, tag) VALUES (?, ?, ?)';
                const [rows] = await database.pool.query(insertQuery, [name, description, tag]);

        const createId = rows.insertId;

        let imageName;

        if (req.file) {
            imageName = 'topic-image-' + id;
            await fs.writeFile(path.join('uploads', imageName), req.file.buffer)
            imageName = ('http://localhost:3000/static/' + imageName);
        }

        if (imageName) {
            await database.pool.query('UPDATE topics SET  image = ? WHERE id = ?',
                [ imageName, createId]);
        }

        const selectQuery = 'SELECT * FROM topics WHERE id = ?';
        const [selectRows] = await database.pool.query(selectQuery, createId)

        res.send(selectRows[0])
    }
    catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }


}

// 2. Get topics -----------------------------------------------------------------------------------------------------------------|
async function getTopics(req, res) {
    try {
        const id = req.auth && req.auth.id;

        let topics;

        if (id) {
            [topics] = await database.pool.query(`SELECT t.*,
            (select count(*) from users_and_topics u where u.topic_id = t.id and u.user_id = ?) as following
            FROM topics t`, id);
        } else {
            [topics] = await database.pool.query('SELECT * FROM topics');
        }

        res.send(topics)
    } catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }

}

// 3. Editar topics----------------------------------------------------------------------------------------------------------------|
async function editTopics(req, res) {
    try {
        const { id } = req.params;
        const { name, description, tag, image } = req.body;
        const topicSchema = joi.object({
            name: joi.string().required(),
            description: joi.string().max(300),
            image: joi.string().max(100).required(),
            tag: joi.string().required()
        });
        await topicSchema.validateAsync({ name, description, tag, image })


        const updateQuery = ('UPDATE topics SET name = ?, image = ?, description = ?, tag = ? WHERE id = ?');

        await database.pool.query(updateQuery, [name, image, description, tag, id]);

        const selectQuery = 'SELECT * FROM topics WHERE id = ?';
        const [selectRows] = await database.pool.query(selectQuery, id);

        res.send(selectRows[0]);
    } catch (error) {
        res.status(500);
        res.send({ error: error.message });
    }
}

module.exports = {
    addTopic,
    getTopics,
    editTopics,
}