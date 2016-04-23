angular.module('issueTracker.users',[])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/login',{
                templateUrl: 'js/controllers/login/login.html'
            })
            .when('/register',{
                templateUrl: 'js/controllers/login/login.html'
            });
    }])
    .controller('loginController',['$scope','$location',function($scope,$location){
        var path = $location.path();
        var shouldRegister = path != '/login';
        
        var login = function(){
            alert('funzies');
        };
        
        var register = function(){
            alert('funzies squared');
        };
        
        function onChange(){
            $scope.equal = $scope.user.password == $scope.user.cPassword;
        }
        
        $scope.onChange = onChange;
        $scope.register = shouldRegister;
        $scope.buttonText = path.substr(1);
        $scope.buttonAction = shouldRegister ? register : login;
    }]);