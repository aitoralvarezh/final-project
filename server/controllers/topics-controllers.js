
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
            imageName = 'topic-image-' + createId;
            await fs.writeFile(path.join('uploads', imageName), req.file.buffer)
            imageName = ('http://localhost:3000/static/' + imageName);
        }

        if (imageName) {
            await database.pool.query('UPDATE topics SET  image = ? WHERE id = ?',
                [imageName, createId]);
        }

        const selectQuery = await database.pool.query('SELECT * FROM topics WHERE id = ?', [createId]);
        

        res.send(selectQuery[0])
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
        const { name, description } = req.body;

        let imageName;

        if (req.file) {
            imageName = 'topic-image-' + id;
            await fs.writeFile(path.join('uploads', imageName), req.file.buffer)
            imageName = ('http://localhost:3000/static/' + imageName);
        }

        if (imageName) {
            await database.pool.query('UPDATE topics SET  name = ?, description = ?, image = ? WHERE id = ?',
                [name, description, imageName, id]);
        } else {
            await database.pool.query('UPDATE topics SET name = ?, description = ?, WHERE id = ?',
                [name, description, tag, id]);
        }

        const selectQuery = await database.pool.query('SELECT * FROM topics WHERE id = ?', id);

        res.send(selectQuery[0]);
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