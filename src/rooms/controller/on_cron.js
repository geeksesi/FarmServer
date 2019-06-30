const db_set = require('./../../db/set');
const cron = require('./cron');
module.exports = function on_cron(send, message, client, clients) {
    if (typeof message.type === 'undefined' && typeof message.build_id === 'undefined') {
        send(client, {
            ok: false,
            message_type: "on_cron",
            message: `please fill required`
        });
        return false;
    }
    cron.do_cron(message.build_id, this.authed_client[client.id].id, res => {
        if (!res) {
            console.log("shit");
            send(client, {
                ok: false,
                message_type: "on_cron",
                message: `something happen wrong`
            });
            return false;
        }
        if (res.cron === false) {
            send(client, {
                ok: true,
                message_type: "on_cron",
                message: `cron happend successfully`,
                build: {
                    id: res.build._id,
                    type: res.build.type,
                    x0: res.build.x0,
                    x1: res.build.x1,
                    y0: res.build.y0,
                    y1: res.build.y1,
                },
                cron: null
            });
            return true;
        }
        send(client, {
            ok: true,
            message_type: "on_cron",
            message: `cron happend successfully`,
            build: null,
            cron: res.cron,
        });

    });
}