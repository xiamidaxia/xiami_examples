'use strict'

var myApp = angular.module('app', [
    'ngRoute',
    "i18n",
    //"ui"
    //'myApp.controllers',
    //'myApp.directives',
    //'myApp.services',
    //'myApp.filters'
])
myApp.config(function($routeProvider, $locationProvider, i18nProvider) {
    $locationProvider.html5Mode(true)
    $routeProvider.otherwise({redirecTo: "/404"})
    i18nProvider.set('en-us') //set i18n
})
myApp.run(function() {

})


angular.bootstrap(document, ['app'])
