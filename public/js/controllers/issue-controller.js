angular.module("issueTracker.issues",[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id',{
            resolve: {
                authenticated : function ($location, auth){
                    var result = auth.GetLoggedIn();
                    if(result){
                        $location.path('/dashboard');
                        return true;
                    }else{
                        return false; 
                    }
                }
            },
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
              $scope.canResolve = result.data.Status.Name !== 'Closed';
              console.log(result);
           });
           
            $scope.logOut = function() {
                auth.Logout().then(function(response){
                    $location.path('#/');
                });
            }   
       } 
    ]);