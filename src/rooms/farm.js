const colyseus = require('colyseus');
// const { encrypt, decrypt } = require('./../controller/security');
const { Build, User } = require('./../db/module');
const { add_build, update_build, delete_build, add_user } = require('./../db/set');
// const passwordHash = require('password-hash');

module.exports = class extends colyseus.Room {

    onInit(options) {
        // this.autoDispose = false;
        this.authed_client = {};
        console.log("init");
    }

    onAuth(options) {
        // console.log(options.id);
        let user_id = options.id;
        let promise = new Promise((resolve, reject) => {
            User.findOne({ _id: user_id }, (err, user) => {
                if (err !== null || user == null || user.length === 0) {
                    add_user(res => {
                        if (!res.ok) {
                            // console.log("err "+err);
                            reject(false);
                        } else {
                            resolve(res.body);
                        }
                    });

                } else {
                    resolve(user);
                }
            });
        })
        return promise;
    }



    onJoin(client, options, auth) {
        if (auth === false) {
            return false;
        }
        // console.log(auth);
        this.authed_client[client.id] = {
            user_id: auth._id,
            xp: auth.xp,
            soft_currency: auth.soft_currency,
            hard_currency: auth.hard_currency,
            ws: client
        }
        Build.find({ user_id: this.authed_client[client.id].id }, (err, build) => {
            if (err) {
                this.send(client, {
                    ok: false,
                    message_type: "init",
                    message: "can't access to database",
                    data: null,
                    user: auth
                });

                return false;
            }
            console.log(build);
            this.send(client, {
                ok: true,
                message: "here your init data",
                message_type: "init",
                data: build,
                user: auth
            });
            // console.log(build);
        })
        console.log("someon is here");
    }
    onMessage(client, message) {
        // console.log(message);
        if (message.message_type === 'add_build') {
            if (typeof message.type === 'undefined' && typeof message.location === 'undefined') {
                console.log("it's ok")
                this.send(client, {
                    ok: false,
                    message_type: "on_add",
                    message: `please fill required`
                });
                return false;
            }
            add_build(message.type, this.authed_client[client.id].id, message.location, res => {
                if (!res.ok) {
                    console.log("jj");
                    this.send(client, {
                        ok: false,
                        message_type: "on_add",
                        message: `can't set build on ${message.location}`
                    });
                } else {
                    this.send(client, {
                        ok: true,
                        message_type: "on_add",
                        message: `build maded by id : ${res.body._id}`,
                        data: {
                            id: res.body._id,
                            type: res.body.type,
                            x0: res.body.x0,
                            x1: res.body.x1,
                            y0: res.body.y0,
                            y1: res.body.y1,
                        }
                    });
                }
            });
        } else if (message.message_type === 'update_build') {
            if (typeof message.id === 'undefined' && typeof message.new_type === 'undefined' && typeof message.new_location === 'undefined') {
                this.send(client, {
                    ok: false,
                    message_type: "on_change",
                    message: `please fill required`
                });
                return false;
            }
            update_build(message.id, message.new_location, res => {
                if (!res.ok) {
                    console.log(res);
                    this.send(client, {
                        ok: false,
                        message_type: "on_change",
                        message: `can't update build on ${message.new_location}`
                    });
                } else {
                    this.send(client, {
                        ok: true,
                        message: `build updated by id : ${res.body._id}`,
                        message_type: "on_change",
                        data: {
                            id: res.body._id,
                            type: res.body.type,
                            location: res.body.location
                        }
                    });
                }
            });
        } else if (message.message_type === 'delete_build') {
            if (typeof message.id === 'undefined') {
                this.send(client, {
                    ok: false,
                    message_type: "on_delete",
                    message: `please fill required`
                });
                return false;
            }
            delete_build(message.id, res => {
                if (!res.ok) {
                    this.send(client, {
                        ok: false,
                        message_type: "on_delete",
                        message: `can't delete this build`
                    });
                } else {
                    this.send(client, {
                        ok: true,
                        message_type: "on_delete",
                        message: `build deleted successfully`
                    });
                }
            })
        }
    }

    onLeave(client, consented) {}
    onDispose() {}


}