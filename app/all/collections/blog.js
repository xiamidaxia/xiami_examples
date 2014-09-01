var blogCollection = new Meteor.Collection('blog')

if (global.isClient) {
    var a = Meteor.subscribe('blog', {
        onReady: function(ready) {
        },
        onError: function(error) {
            console.log(error.message)
        }
    })
}


if (global.isServer) {
    if (blogCollection.find({}).count() === 0) {
        blogCollection.insert({title:"blog1",content:"blog1 content....."})
        blogCollection.insert({title:"blog2",content:"blog2 content....."})
    }
    //var userCollection = new Meteor.Collection('users')
    Meteor.publish("blog", function() {
        return blogCollection.find({})
    })
}
