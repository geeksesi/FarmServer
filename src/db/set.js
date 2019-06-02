const db_module = require('./module');
const password_hash = require('password-hash');

function add_build(type, location, cb) {
    const add_build = new db_module.Build({
        type: type,
        location: location

    });
    let resault = {};
    add_build.save((err, res) => {
        if (err) {
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
            resault.body = res;
        }
        cb(resault);
    })

}

function update_build(id, new_type, new_location, cb) {
    resault = {};
    db_module.Build.findOneAndUpdate({ _id: id }, {
            type: new_type,
            location: new_location
        }, { runValidators: true, context: 'query' },
        (err, build) => {
            if (err) {
                resault.ok = false;
                resault.body = err;
            } else {
                resault.ok = true;
                resault.body = build;
            }
            cb(resault);
        });
}

function delete_build(id, cb) {
    resault = {};
    db_module.Build.findOneAndDelete({ _id: id }, (err) => {
        if (err) {
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
        }
        cb(resault);
    });
}

module.exports = {
    add_build: add_build,
    update_build: update_build,
    delete_build: delete_build,
};