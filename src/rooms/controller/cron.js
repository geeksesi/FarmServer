const db_set = require('./../../db/set');
const { Cron } = require('./../../db/module');

function set_cron(build_id, cb) {
    db_set.add_cron(build_id, 10, Math.round((new Date()).getTime() / 1000) + 10, "move", res => {
        if (!res.ok) {
            cb(false);
            return false;
        }
        cb(true);
        return true;
    });
}

function do_cron(build_id, user_id, cb) {
    Cron.findOne({ build_id: build_id, status: "open" }, (err, cron) => {
        console.log(cron);
        if (err) {
            cb(false);
            return false;
        }
        if (cron == null || cron.length === 0) {
            cb(false);
            return false;
        }
        if (cron.finish_time > Math.round((new Date()).getTime() / 1000)) {
            cb({
                cron: cron,
                build: false
            });
            return true;
        }
        db_set.update_build(build_id, user_id, { x0: 1, x1: 6, y0: 1, y1: 6 }, res => {
            if (!res.ok) {
                cb(false);
                return false;
            }
            console.log("hell")
            cb({
                cron: false,
                build: res.body
            });
            return true;
        })
    });
}

module.exports = {
    set_cron: set_cron,
    do_cron: do_cron,
}