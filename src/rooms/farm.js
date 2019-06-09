const colyseus = require('colyseus');
// const { encrypt, decrypt } = require('./../controller/security');
const { Build } = require('./../db/module');
const { add_build, update_build, delete_build } = require('./../db/set');
// const passwordHash = require('password-hash');

module.exports = class extends colyseus.Room {

    onInit(options) {
        this.authed_client = {};
        console.log("init");
    }
    
    onAuth(options) {
        console.log("auth");
        return true;
    }



    onJoin(client, options, auth) {
        Build.find({}, (err, build) => {
            if(err)
            {
                this.send(client, {
                    ok: false,
                    message_type: "init",
                    message: "can't access to database",
                    data: err
                });

                return false;
            }
            this.send(client, {
                ok: true,
                message_type: "init",
                data: build
            });

        })
        console.log("someon is here");
    }
    onMessage(client, message) {
        console.log(message);
        if (message.message_type === 'add_build') {
            if (typeof message.type === 'undefined' && typeof message.location === 'undefined') {
                this.send(client, {
                    ok: false,
                    message_type: "on_add",
                    message: `please fill required`
                });
                return false;
            }
            add_build(message.type, message.location, res => {
                if (!res.ok) {
                    this.send(client, {
                        ok: false,
                        message_type: "on_add",
                        message: `can't set build on ${message.location}`
                    });
                } else {
                    this.send(client, {
                        ok: true,
                        message: `build maded by id : ${res.body._id}`,
                        data: {
                            id: res.body._id,
                            message_type: "on_add",
                            type: res.body.type,
                            location: res.body.location
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