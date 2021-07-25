const fs = require("fs").promises

exports.readPath = async function() {
    var path = await fs.readdir("./uploads")
    // console.log(path)
    return path
}