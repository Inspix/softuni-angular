angular.module('issueTracker',[
    'ngRoute',
    'issueTracker.users',
    'issueTracker.issues',
    'issueTracker.project',
    'issueTracker.dashboard',
    'issueTracker.auth'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.otherwise({ redirectTo: '/'});
    }]);