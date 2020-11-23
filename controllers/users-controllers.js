const { database } = require('../structure');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// 1. Ver los usuarios registrados

async function getUsers(req, res) {
    try {
        const users = await database.pool.query('SELECT * FROM users')
        res.send(users[0]);
    } catch (err) {
        res.status(500);
        res.send({ error: err.message })
    }
}

// 2. Registrar un nuevo usuario

async function createUser(req, res) {
    try {

        const { username, mail, password } = req.body;

        const userSchema = joi.object({
            username: joi.string().required(),
            mail: joi.string().email().required(),
            password: joi.string().min(6).max(20).required()

        });
        await userSchema.validateAsync({ username, mail, password });

        const dataConfirm = 'SELECT * FROM users WHERE mail = ?';
        const [users] = await database.pool.query(dataConfirm, mail);

        if (users.length) {
            const err = new Error('Ya existe un usuario registrado con ese email');
            err.code = 409;
            throw err;
        }

        const userNameConfirm = 'SELECT * FROM users WHERE username = ?'
        const [userNames] = await database.pool.query(userNameConfirm, username)

        if (userNames.length) {
            const err = new Error('Ya existe un usuario registrado con ese nombre de usuario');
            err.code = 409;
            throw err;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (username, mail, password) VALUES (?, ?, ?)';
        const [rows] = await database.pool.query(insertQuery, [username, mail, passwordHash]);

        const createId = rows.insertId;

        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        const [selectRows] = await database.pool.query(selectQuery, createId);

        res.send(selectRows[0]);

    } catch (err) {
        res.status(500);
        res.send({ error: err.message })
    }
}

// 3. Login de usuarios-----------------------------------------------------------------------------------------|

async function login(req, res) {
    try {
        const { mail, username, password } = req.body;
        const schema = joi.object({
            mail: joi.string().email(),
            username: joi.string(),
            password: joi.string().min(6).max(20).required(),
        })

        await schema.validateAsync({ mail, username, password });

        const [result] = await database.pool.query('SELECT * FROM users WHERE mail = ? OR username = ?', [mail, username]);

        if (!result || !result.length) {
            const error = new Error('El usuario no existe, o has introducido mal la dirección de email o el usuario');
            error.code = 404;
            throw error;
        }

        const user = result[0];

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const error = new Error('La contraseña no es correcta');
            error.code = 401;
            throw error;
        }

        const tokenPayload = { id: user.id, role: user.role };

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );
        res.header({ Authorization: 'Bearer ' + token }).send({ token });

    } catch (err) {
        res.status(500);
        res.send({ error: err.message })
    }

}

// 4. Edicion de perfil----------------------------------------------------------------------------------------------|

async function editProfile(req, res) {

    try {
        const { id } = req.auth;
        const { name, image, description } = req.body;

        const schema = joi.object({
            name: joi.string(),
            image: joi.string(),
            description: joi.string().min(20).max(300)
        });

        await schema.validateAsync({ name, image, description });

        const updateQuery = ('UPDATE users SET name = ?, image = ?, description = ? WHERE id = ?');

        await database.pool.query(updateQuery, [name, image, description, id]);

        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        const [selectRows] = await database.pool.query(selectQuery, id);

        res.send(selectRows[0]);
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }

}


async function editInfo(req, res) {

    try {
        const { id } = req.auth;
        const { mail, password, username } = req.body;

        const schema = joi.object({
            mail: joi.string(),
            password: joi.string(),
            username: joi.string().min(20).max(300)
        });
        const [result] = 'SELECT mail, username, password FROM users WHERE id = ?';

        if (!result || !result.length) {

        }

        await schema.validateAsync({ mail, password, username });

        const updateQuery = ('UPDATE users SET mail = ?, password = ?, username = ? WHERE id = ?');

        await database.pool.query(updateQuery, [mail, password, username, id]);

        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        const [selectRows] = await database.pool.query(selectQuery, id);

        res.send(selectRows[0]);
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }

}

// ?. Eliminar a un usuario.

async function deleteProfile(req, res) {
    try {
        const { id } = req.params;

        const closeAccount = await database.pool.query('DELETE * FROM users WHERE id = ?', id);

        res.send(closeAccount[0]);
    }
    catch (error) {
        res.status(500);
        res.send({ error: error.message })
    }
}

// Exportaciones.

module.exports = {
    getUsers,
    createUser,
    editProfile,
    login,
    editInfo,
    deleteProfile,

}
