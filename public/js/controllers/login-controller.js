angular.module('issueTracker.users',[])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/',{
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
                templateUrl: 'templates/login.html'
            })
    }])
    .controller('loginController',['$scope','$location','auth',function($scope,$location,auth){
        $scope.error = false;
        $scope.errorMessage = '';
        function Login(user){
            auth.LogIn(user.email,user.password)
            .then(
                function(response){
                    $location.path('#/dashboard');
                },
                function(error){
                    var element = angular.element(document.getElementById('loginFormContainer')).scope();
                    element.$applyAsync(function(){
                        element.error = error.status == 400;
                        element.errorMessage = error.data.error_description;
                    });
                });
        }
            
        function Register(user){
            auth.Register(user.email, user.password, user.cPassword).then(
                function(data){
                    console.log('registered');
                    Login(user);
                },
                function(error){
                    var element = angular.element(document.getElementById('registerFromContainer')).scope();
                        element.$applyAsync(function(){
                            console.log(error);
                            element.error = error.status == 400;
                            var errorMessage = error.data.ModelState[""][1];
                            element.errorMessage = errorMessage;
                        });
            });            
        };
        
        $scope.login = Login;
        $scope.register = Register;
        
        function onChange(){
            $scope.equal = $scope.user.password == $scope.user.cPassword;
        }
        
        $scope.onChange = onChange;
    }]);