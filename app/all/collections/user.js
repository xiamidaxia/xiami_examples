var users = Meteor.users
console.log(users.find({}).count())
if (global.isServer) {
    Meteor.publish("users", function(userId) {
        console.log(userId)
        return users.find({})
    })
}
