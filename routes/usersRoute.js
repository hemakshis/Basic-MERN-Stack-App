import express from 'express';
import User from '../models/usersModel.js';

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

export default router;
