const { Build } = require('./module');

function build_location(x0, x1, y0, y1, user_id) {
    let promis = new Promise((resolve, reject) => {
        Build.find({
            user_id: user_id,
            x0: { $lte: x1 },
            x1: { $gte: x0 },
            y0: { $lte: y1 },
            y1: { $gte: y0 },
        }, (err, builds) => {
            if (err !== null || builds === null || builds.length < 1) {
                resolve(true);
                console.log("not_hell")
            } else {
                resolve(false);
                console.log("hell")
            }
        });
    })
    return promis;
}



module.exports = {
    build_location: build_location,
}