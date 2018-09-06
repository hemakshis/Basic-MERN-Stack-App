import express from 'express';
import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = express.Router();

router.post('/validate', (req, res) => {
    const { field, value } = req.body;
    let errors = {};
    User.findOne({[field]: value}, (err, user) => {
        if (err) throw err;
        if (Boolean(user)) {
            errors = {
                [field]: "This " + field + " is not available"
            };
            res.json({ errors });
        } else {
            res.json({ success: 'success' });
        }
    });
});

router.post('/signup', (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    let errors = {};
    Object.keys(req.body).forEach(field => {
        if (req.body[field] === '') {
            errors = {...errors, [field]: "This " + field + " is required"}
        }
        else if (field === 'username' || field === 'email') {
            const value = req.body[field];
            User.findOne({[field]: value}, (err, user) => {
                if (err) throw err;
                if (Boolean(user)) {
                    errors = {
                        ...errors,
                        [field]: "This " + field + " is not available"
                    };
                }
            });
        }
        else if (field === 'password' && password !== '' && password < 4) {
            errors = {...errors, [field]: 'Password too short'}
        }
        else if (field === 'confirmPassword' && confirmPassword !== password) {
            errors = {...errors, [field]: 'Passwords do not match'}
        }
    });

    if (Object.keys(errors).length > 0) {
        res.json({ errors });
    } else {
        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: password
        });
    
        newUser.save(err => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    }

});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let response = {};
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
                    errors: { invalidCredentials: 'Invalid Username or Password' }
                }
            }
        } else {
            response = {
                errors: { invalidCredentials: 'Invalid Username or Password' }
            }
        }

        res.json(response);
    })
});

export default router;
