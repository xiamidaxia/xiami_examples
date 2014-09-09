'use strict'

var myApp = angular.module('app', [
    '#templates',
    'ngRoute',
    'common/services',
    'common/directives',
    "common/i18n",
    "header",
    "ui"
])
myApp.controller('appCtrl', function($scope, $rootScope, $transition) {
    $rootScope.root = 'this is in root'
    $scope.child = 'this is in child'
})
myApp.config(function($routeProvider, $locationProvider, i18nProvider) {
    $locationProvider.html5Mode(true)
    $routeProvider.otherwise({redirecTo: "/404"})
    i18nProvider.set('en-us') //set i18n
})
myApp.run(function() {
    //console.log($templateCache.get('client/header/index.angular'))
})


angular.bootstrap(document, ['app'])
