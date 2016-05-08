angular.module("issueTracker.issues",[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id',{
            templateUrl:'templates/issue.html',
            controller:'issueController'
        });
    }])
    .controller("issueController",[
       '$scope',
       '$routeParams',
       'auth',
       'appUser',
       function($scope,$routeParams,auth,appUser){
           auth.GetIssue($routeParams.id).then(function(result){
               console.log(result);
              $scope.issue = result.data;
              $scope.canResolve = result.data.Status.Id !== 'Closed';
              console.log(result);
           });
       } 
    ]);