var app = angular.module('header', [])
app.controller('headerCtrl', function($scope, $location, $route, security, breadcrumbs, notifications){
    $scope.location = $location
    $scope.breadcrumbs = breadcrumbs

    $scope.isAuthenticated = security.isAuthenticated

})