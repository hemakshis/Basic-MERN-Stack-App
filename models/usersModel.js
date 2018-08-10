import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

const User = mongoose.model('User', UserSchema)

export default User;
