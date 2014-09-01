'use strict'
// Declare app level module which depends on filters, and services
angular.module('myApp', [
    //'ngRoute',
    'ionic',
    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'myApp.filters'
])
.controller('mainCtrl', function($scope) {
    $scope.aa = 333
    console.log('main: ', $scope)
})
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('home', {
            url: "/",
            template: require('client/templates/home.html'),
            controller: 'homeCtrl'
        })
        // setup an abstract state for the tabs directive
        .state('tab', {
            url: "/tab",
            abstract: true,
            template: require("client/templates/tabs.html")
        })
        .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    template: require('client/templates/tab-dash.html'),
                    controller: 'DashCtrl'
                }
            }
        })
        .state('tab.friends', {
            url: '/friends',
            views: {
                'tab-friends': {
                    template: require('client/templates/tab-friends.html'),
                    controller: 'FriendsCtrl'
                }
            }
        })
        .state('tab.friend-detail', {
            url: '/friend/:friendId',
            views: {
                'tab-friends': {
                    template: require('client/templates/friend-detail.html'),
                    controller: 'FriendDetailCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    template: require('client/templates/tab-account.html'),
                    controller: 'AccountCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true)
});

console.log('start myApp')
angular.bootstrap(document, ['myApp'])
