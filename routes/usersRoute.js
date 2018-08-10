import express from 'express';
import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import config from '../config'

const router = express.Router();

router.post('/validate', (req, res) => {
    const field = req.body.field;
    const value = req.body.value;

    let errors = {};

    User.findOne({[field]: value}, (err, user) => {
        if (err) throw err;
        if (Boolean(user)) {
            errors = {
                [field]: "This " + field + " is not available"
            };
        } else {
            errors = {};
        }

        res.json(errors);
    });

});

router.post('/signup', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(err => {
        if (err) throw err;
        else {
            res.json({success: 'success'});
        }
    })
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let response = {};
    console.log(req.body)
    User.findOne({username: username}, (err, user) => {
        if (err) throw err;
        if (Boolean(user)) {
            console.log(user)
            if (user.password === password) {
                const token = jwt.sign({
                    id: user._id,
                    username: user.username
                }, config.jwtSecret);
                response = {token}
            } else {
                response = {
                    errors: {invalidCredentials: 'Invalid Username or Password'}
                }
            }
        } else {
            response = {
                errors: {invalidCredentials: 'Invalid Username or Password'}
            }
        }
        console.log(response);
        res.json(response);
    })
});

export default router;
