exports.requestJoinOptions = function(i) {
    return { requestNumber: i };
}

exports.requestJoinOptions = function() {
    return {id: "12"};
}

exports.onJoin = function() {
    console.log(this.sessionId, "joined.");

    // this.send({
    //     message_type: 'add_build',
    //     type : 'tower',
    //     location : "1-2"
    // });
    // this.send({
    //     message_type: 'update_build',
    //     id : "5cf323cc6525ad6d88dcc8fe",
    //     new_type : 'town_hall',
    //     new_location : "5-5"
    // });
    // this.send({
    //     message_type: 'delete_build',
    //     id : "5cf323cc6525ad6d88dcc8fe",
    // });
}

exports.onMessage = function(message) {
    console.log(this.sessionId, "received:", message);

}

exports.onLeave = function() {
    console.log(this.sessionId, "left.");
}

exports.onError = function(err) {
    console.log(this.sessionId, "!! ERROR !!", err.message);
}

exports.onStateChange = function(state) {
    console.log(this.sessionId, "new state:", state);
}