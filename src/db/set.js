const db_module = require('./module');
const password_hash = require('password-hash');

function add_build(type, x, y, space, cb) {
    const add_build = new db_module.Build({
        type: type,
        x: x,
        y: y,
        space: space

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

function update_build(id, new_x, new_y, cb) {
    resault = {};
    db_module.Build.findOneAndUpdate({ _id: id }, {
            x: new_x,
            y: new_y,
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


function add_user(cb) {
    const add_user = new db_module.User({
        xp: 0,
        soft_currency: 100,
        hard_currency: 0
    });
    let resault = {};
    add_user.save((err, res) => {
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

module.exports = {
    add_build: add_build,
    update_build: update_build,
    delete_build: delete_build,
    add_user: add_user,
};