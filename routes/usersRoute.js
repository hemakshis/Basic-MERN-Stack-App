import express from 'express';
import User from '../models/usersModel';

const router = express.Router();

router.post('/users/signup', (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    let errors = [];

    Object.keys(req.body).forEach(field => {
        if(req.body[field].trim() === '') {
            errors.push({field: field, msg: 'This field is required'});
        }
    });

    if(password.length < 4) {
        errors.push({field: 'password', msg: 'Password length too short'});
    }

    if (password !== confirmPassword) {
        errors.push({field: 'confirmPassword', msg: 'Passwords do not match'});
    }

    if (errors.length) {
        res.json({errors});
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
                res.json({success: 'success'});
            }
        })
    }
});

export default router;
