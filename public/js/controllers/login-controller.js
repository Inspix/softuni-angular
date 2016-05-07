angular.module('issueTracker.users',[])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/',{
                templateUrl: 'templates/login.html'
            })
    }])
    .run(['$location', 'auth',function($location, auth){
        if(auth.GetLoggedIn()){
            $location.path('/dashboard');
        };
    }])
    .controller('loginController',['$scope','auth',function($scope,auth){
        
        
        $scope.login = function(user){
            $scope.token = auth.LogIn(user.email,user.password);
        };
        
        $scope.register = function(user){
            auth.Register(user.email, user.password, user.cPassword);
        };
        
        function onChange(){
            $scope.equal = $scope.user.password == $scope.user.cPassword;
        }
        
        $scope.onChange = onChange;
    }]);