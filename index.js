var xiami = require('xiami')
var config = require('./server_config')
var family = {
    client: __dirname + "/app/client",
    all: __dirname + "/app/all",
    server: __dirname + "/app/server"
}
xiami.Fiber(function() {
    var app = xiami.serverCreate({family:family})
    //add your config
    app.require('xiami/config').init(config)
    //run your main file
    app.require('server/main')
    //run webapp
    app.require('xiami/webapp').run()
})

