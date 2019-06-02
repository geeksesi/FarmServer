const mongoos = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const buildSchema = mongoos.Schema({
    type: {
        type: String,
        require: true,
    },
    location: {
        type : String,
        require :true,
        unique : true,
    }

});


buildSchema.plugin(uniqueValidator);
const Build = mongoos.model("Build", buildSchema);
module.exports = {
    Build: Build
};