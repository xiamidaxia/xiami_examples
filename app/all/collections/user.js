var users = Meteor.users
if (global.isServer) {
    //var userCollection = new Meteor.Collection('users')
    Meteor.publish("users", function(userId) {
        console.log(userId)
        return users.find({})
    })
}
