const { Build } = require('./module');

async function build_location(x0, x1, y0, y1) {
    let promis = new Promise((resolve, reject) => {
        Build.find({
            x0: { $lt: x1 },
            x1: { $gt: x0 },
            y0: { $lt: y1 },
            y1: { $gt: y0 },
        }, (err, builds) => {
            if(err !== null || builds === null || builds.length < 1){
                resolve(true);
            }
            else{
                reject(false);
            }
        });
    })
    return promis;
}



module.exports = {
    build_location : build_location,
}