var _ = require('underscore')
var xiamiFamiles = require('xiami').families

var allFamilies = _.extend({}, xiamiFamiles, {
    "client": __dirname + "/app/client",
    "all": __dirname + "/app/all",
    "server": __dirname + "/app/server"
})
module.exports = {
    family: allFamilies,
    add: ["xiami/*", "meteor/*", "client/*", "all/*", "server/*"],
    dest: __dirname + "/dest",
    watch: true
}