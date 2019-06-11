const mongoos = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const buildSchema = mongoos.Schema({
    type: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
        unique: true,
    }

});

const userSchema = mongoos.Schema({
    xp: {
        type: Number,
        require: true,
    },
    soft_currency: {
        type: Number,
        require: true,
    },
    hard_currency: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: false,
        unique: true,
    },
});

buildSchema.plugin(uniqueValidator);
userSchema.plugin(uniqueValidator);

const Build = mongoos.model("Build", buildSchema);
const User = mongoos.model("User", userSchema);

module.exports = {
    Build: Build,
    User: User
};