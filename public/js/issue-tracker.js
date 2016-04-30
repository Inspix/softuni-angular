angular.module('issueTracker',[
    'ngRoute',
    'issueTracker.users',
    'issueTracker.issues',
    'issueTracker.project'
    ])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider.otherwise({ redirectTo: '/'})
    }]);