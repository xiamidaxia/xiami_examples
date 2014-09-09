var _ = require('underscore')
var xiamiFamiles = require('xiami').families

var allFamilies = _.extend({}, xiamiFamiles, {
    "client": __dirname + "/app/client",
    "all": __dirname + "/app/all",
    "server": __dirname + "/app/server",
    "test": __dirname + "/app/test"
})
module.exports = {
    family: allFamilies,
    add: ["xiami/*", "meteor/*", "client/*", "all/*", "server/*", "test/*"],
    dest: __dirname + "/dest",
    static_url: "/static",
    mocha_opts: {test: "should",bail:true,timeout:1200},
    test: ['client/*'],
    production: false,
    watch: true
}