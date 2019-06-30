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
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
            resault.body = res;
        }
        cb(resault);
    })

}

async function update_build(id, user_id, location, cb) {
    let resault = {};
    const new_x0 = location.x0;
    const new_x1 = location.x1;
    const new_y0 = location.y0;
    const new_y1 = location.y1;
    if (!await build_location(new_x0, new_x1, new_y0, new_y1, user_id)) {
        resault.ok = false;
        resault.body = {};
        resault.body.message = "can't do build here.";
        cb(resault);
        return false;
    }
    db_module.Build.findOneAndUpdate({ _id: id, user_id : user_id }, {
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
        hard_currency: 0,
        timestamp: Math.round((new Date()).getTime() / 1000)
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

function add_cron(build_id, cron_time, finish_time, cron_type, cb) {
    const add_cron = new db_module.Cron({
        build_id: build_id,
        timestamp: Math.round((new Date()).getTime() / 1000),
        cron_time: cron_time,
        finish_time: finish_time,
        cron_type: cron_type,
        status: "open",
    });
    let resault = {};
    add_cron.save((err, res) => {
        if (err) {
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
            resault.body = res;
        }
        console.log(resault);
        cb(resault);
    })
}

module.exports = {
    add_build: add_build,
    update_build: update_build,
    delete_build: delete_build,
    add_user: add_user,
    add_cron : add_cron,
};