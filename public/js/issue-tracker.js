angular.module('issueTracker',[
    'ngRoute',
    'issueTracker.users',
    'issueTracker.issues',
    'issueTracker.project',
    'issueTracker.dashboard',
    'issueTracker.auth'
    ])
    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){
        $httpProvider.defaults.headers.post = {};
        $routeProvider.otherwise({ redirectTo: '/'});
    }]);