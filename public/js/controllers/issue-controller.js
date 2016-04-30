angular.module("issueTracker.issues",[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id',{
            templateUrl:'templates/issue.html',
            controller:'issueController'
        })
    }])
    .controller("issueController",[
       '$scope',
       '$routeParams',
       function($scope,$routeParams){
           $scope.title = "Issue title";
           $scope.issueId = $routeParams.id;
           $scope.description = "Issue description";
       } 
    ]);