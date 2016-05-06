angular.module('issueTracker.users',[])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/',{
                templateUrl: 'templates/login.html'
            })
    }])
    .controller('loginController',['$scope','$location',function($scope,$location){
        $scope.login = function(){
            alert('funzies');
        };
        
        $scope.register = function(){
            alert('funzies squared');
        };
        
        function onChange(){
            $scope.equal = $scope.user.password == $scope.user.cPassword;
        }
        
        $scope.onChange = onChange;
    }]);