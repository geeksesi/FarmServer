const db_set = require('./../../db/set');
const cron = require('./cron');
module.exports = function add_build(send, message, client, clients) {
    if (typeof message.type === 'undefined' && typeof message.location === 'undefined') {
        send(client, {
            ok: false,
            message_type: "on_add",
            message: `please fill required`
        });
        return false;
    }
    db_set.add_build(message.type, clients[client.id].id, message.location, res => {
        if (!res.ok) {
            send(client, {
                ok: false,
                message_type: "on_add",
                message: `can't set build on ${message.location}`
            });
        } else {
            cron.set_cron(res.body._id, cron_res => {
                console.log(cron_res);
                const cron_obj = {
                    status : cron_res.status,
                    cron_time : cron_res.cron_time
                }
                send(client, {
                    ok: true,
                    message_type: "on_add",
                    message: `build maded by id : ${res.body._id}`,
                    build: {
                        id: res.body._id,
                        type: res.body.type,
                        x0: res.body.x0,
                        x1: res.body.x1,
                        y0: res.body.y0,
                        y1: res.body.y1,
                    },
                    cron : cron_obj,
                });
            })
        }
    });
}
