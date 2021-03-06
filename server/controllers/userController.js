require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

class userController {
    static register(req, res, next) {
        const { fullName, email, password } = req.body;

        User.findOne({ where: { email } })
            .then(data => {
                if (data) next({ name: 'SAME_EMAIL' });
                else {
                    return User.create({ fullName, email, password })
                }
        })
            .then(data => {
                const {id, fullName, email} = data; 
                if(data) res.status(201).json({id, fullName, email});
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;

        User.findOne({ where: { email } })
            .then(data => {
                if (!data || !bcrypt.compareSync(password, data.password)) next({ name: 'LOGIN_FAILED' });
                else {
                    const access_token = generateToken(data);
                    res.status(200).json({ access_token });
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static googleSign(req, res) {
        const token = req.body.id_token;
        let currentEmail = null;
        let name = null;

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                const email = payload['email'];
                currentEmail = email;
                name = payload['name']
                return User.findOne({ where: { email } })
            })
            .then(data => {
                if (data) {
                    const access_token = generateToken(data);
                    res.status(200).json({ access_token });
                }
                else {
                    return User.create({
                        fullName: name,
                        email: currentEmail,
                        password: 'randomPassword'
                    })
                }
            })
            .then(data => {
                if (data) {
                    const access_token = generateToken(data);
                    res.status(200).json({ access_token });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = userController;