/**
 * from https://github.com/lvbreda/Meteor_angularjs
 */
angular.module("meteor", []).service("MeteorCollections", [
    function() {
        var self = this;
        self.collections = {};
        self.getCollection = function(name) {
            if (self.collections[name]) {
                return self.collections[name];
            } else {
                self.collections[name] = new Meteor.Collection(name);
                return self.collections[name];
            }
        }
        return self;

    }]).factory("$meteorObject", [
    function() {
        function ObjectFactory(collection, objectvalue) {
            if(!objectvalue){return;}
            objectvalue.save = function() {
                objectvalue = angular.copy(objectvalue);
                cleanupAngularObject(objectvalue);

                collection.update({
                    _id : this._id
                }, objectvalue);
            }
            objectvalue.remove = function() {
                collection.remove({
                    _id : this._id
                });
            }
            return objectvalue;
        }

        return ObjectFactory;
    }]).factory("$meteor", ["$rootScope", "MeteorCollections", "$meteorObject",
    function($rootScope, MeteorCollections, $meteorObject) {
        $rootScope.apply = _.debounce(function() {
            try {
                $rootScope.$digest();
            } catch(e) {
                setTimeout($rootScope.apply, 0);
            }
        }, 100);
        function CollectionFactory(collection) {
            var collection = MeteorCollections.getCollection(collection);
            var value = [];

            function Collection(value) {
                value = {};
            }


            Collection.observe = function(cursor, array) {
                cursor.observe({
                    "addedAt" : function(document, atIndex, before) {
                        //console.log(document);

                        if (!array) {
                            value = new $meteorObject(collection, document);
                        }
                        if (array) {
                            value[atIndex] = new $meteorObject(collection, document);
                        }
                        $rootScope.apply();
                    },
                    "changedAt" : function(newDocument, oldDocument, atIndex) {

                        value[atIndex] = new $meteorObject(collection, newDocument);
                        $rootScope.apply();
                    },
                    "removedAt" : function(oldDocument, atIndex) {

                        value.splice(atIndex, 1);
                        $rootScope.apply();
                    }
                })
            }
            Collection.find = function(selector, options, callback) {
                value = this instanceof Collection ? this : [];
                this.observe(collection.find(selector, options), true);
                return value;
            }
            Collection.findOne = function(selector, options, callback) {
                value = this instanceof Collection ? this : {};
                value = new $meteorObject(collection,collection.find(selector,options).fetch()[0]);
                this.observe(collection.find(selector, options), false);
                return value;
            }
            Collection.insert = function(values) {
                values = angular.copy(values);
                cleanupAngularObject(values);
                return collection.insert(values);
            }
            Collection.update = function(selector, updateValues) {
                updateValues = angular.copy(updateValues);
                cleanupAngularObject(updateValues);
                delete updateValues._id;
                return collection.update(selector, {
                    $set : updateValues
                });
            }
            Collection.remove = function(selector) {
                return collection.remove(selector);
            }
            return Collection;
        }

        return CollectionFactory;
    }]);

/** Removes AngularJS transient properties from Object tree */
cleanupAngularObject = function(value) {
    if (value instanceof Array) {
        for (var i = 0; i < value.length; i++) {
            cleanupAngularObject(value[i]);
        }
    }
    else if (value instanceof Object) {
        for (var property in value) {
            if (/^\$+/.test(property)) {
                delete value[property];
            }
            else {
                cleanupAngularObject(value[property]);
            }
        }
    }
}