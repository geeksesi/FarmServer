const mongoos = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const buildSchema = mongoos.Schema({
    user_id: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true,
    },
    x0: {
        type: int,
        require: true,
    },
    y0: {
        type: int,
        require: true,
    },
    x1: {
        type: int,
        require: true,
        validate: function(v) {
            return new Promise(function(resolve, reject) {
                Build.find({ x: { $gt: this.x, $lt: (this.x + space) } });
            });
        }
    },
    y1: {
        type: int,
        require: true,
    },

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

const Build = mongoos.model("build", buildSchema);
const User = mongoos.model("user", userSchema);

module.exports = {
    Build: Build,
    User: User
};