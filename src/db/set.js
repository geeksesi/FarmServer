const db_module = require('./module');
const password_hash = require('password-hash');
const { build_location } = require('./validation');

async function add_build(type, user_id, location, cb) {
    let resault = {};
    const x0 = location.x0;
    const x1 = location.x1;
    const y0 = location.y0;
    const y1 = location.y1;
    if (!await build_location(x0, x1, y0, y1, user_id)) {
        resault.ok = false;
        resault.body = {};
        resault.body.message = "can't do build here.";
        console.log("it's very hell")
        cb(resault);
        return false;
    }
    const add_build = new db_module.Build({
        type: type,
        user_id: user_id,
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,

    });
    add_build.save((err, res) => {
        if (err) {
            console.log(err);
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
            resault.body = res;
        }
        cb(resault);
    })

}

async function update_build(id, user_id, new_x0, new_y0, new_x1, new_y1, cb) {
    let resault = {};
    if (!await build_location(new_x0, new_x1, new_y0, new_y1, user_id)) {
        resault.ok = false;
        resault.body = {};
        resault.body.message = "can't do build here.";
        cb(resault);
        return false;
    }
    db_module.Build.findOneAndUpdate({ _id: id }, {
            x0: new_x0,
            y0: new_y0,
            x1: new_x1,
            y1: new_y1,
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