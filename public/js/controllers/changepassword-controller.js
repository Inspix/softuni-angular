angular.module("issueTracker.profile",[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/profile/changepassword',{
            resolve: {
                authenticated : function ($location, auth){
                    var result = auth.GetLoggedIn();
                    if(result){
                        return true;
                    }else{
                        $location.path('#/');
                        return false; 
                    }
                }
            },
            templateUrl:'templates/changePassword.html',
            controller:'changePasswordController'
        });
    }])
    .controller("changePasswordController",[
       '$scope',
       '$location',
       'auth',
       'appUser',
       function($scope,$location,auth,appUser){
            $scope.Username = appUser.userName;

            $scope.changePassword = function(data){
                auth.ChangePassword(data).then(function(response){
                    $location.path('#/dashboard');
                });
            }
            $scope.onChange = function(){
                $scope.equal = $scope.data.NewPassword == $scope.data.ConfirmPassword;
            }
       } 
    ]);