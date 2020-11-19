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

        const mailConfirm = 'SELECT * FROM users WHERE mail = ?';
        const [users] = await database.pool.query(mailConfirm, mail);

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

        let [result] = [];

        if (mail && mail.length > 0) {
            console.log('usuario introduce mail');

            result = await database.pool.query('SELECT * FROM users WHERE mail = ?', [mail]);
            /* console.log('resultado:', result[0]); */

            if (!result || !result.length) {
                const error = new Error('El usuario no existe, o has introducido mal la dirección de email');
                error.code = 404;
                throw error;
            }
        } else {
            console.log('usuario introduce username');
            result = await database.pool.query('SELECT * FROM users WHERE username = ?', [username]);

            if (!result || !result.length) {
                const error = new Error('El usuario no existe, o has introducido mal el nombre de usuario');
                error.code = 404;
                throw error;
            }
        }
        console.log('resultado:', result[0]);
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
        res
/*             .header({ Authorization: 'Bearer ' + token })
 */            .send({ token });



    } catch (err) {
        res.status(500);
        res.send({ error: err.message })
    }

}

async function editProfile(req, res) {

    try {
        const { username, name, image, password, birthday, description } = req.body;
        const { id } = req.params;
        const insertQuery = ('UPDATE users VALUES (?, ?, ?, ?, ?, ?) WHERE id = ?', id);

        const userSchema = joi.object({
            username: joi.string().max(15),
            name: joi.string(),
            image: joi.string(),
            password: joi.string().min(6).max(20),
            birthday: joi.string(),
            description: joi.string().min(20).max(300)
        });

        await userSchema.validateAsync({ username, name, image, password, birthday, description });
        const mailConfirm = 'SELECT mail FROM users WHERE id = ?'


        if (!mailConfirm || !mailConfirm.length) {
            const err = new Error('Ya existe un usuario registrado con ese email');
            err.code = 409;
            throw err;
        }

        const userNameConfirm = 'SELECT username FROM users WHERE id = ?'

        if (!userNameConfirm || !userNameConfirm.length) {
            const err = new Error('Ya existe un usuario registrado con ese nombre de usuario');
            err.code = 409;
            throw err;
        }

        const [change] = await database.pool.query(insertQuery)

        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        const [selectRows] = await database.pool.query(selectQuery, id);

        res.send(selectRows[0]);
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }


}


// Exportaciones.

module.exports = {
    getUsers,
    createUser,
    editProfile,
    login,

}
