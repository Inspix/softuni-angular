angular.module('issueTracker.auth',['issueTracker.api','ngCookies'])
    .config(['$httpProvider',function($httpProvider){
         $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }])
    .factory("auth",["$http","$cookies","Users",function($http,$cookies,Users){
        var loggedIn = true;
        
        var token = undefined;
        
        function GetLoggedin(){
            var logged = $cookies.get('auth-token') != undefined;
            return logged;
        }
        
        function LogIn(email,password){
            var result = Users.login.save("Username=" + email + '&Password=' + password + '&grant_type=password',function(data){
                token = data.access_token;
                $cookies.put('auth-token',token);
            }).$promise;
            console.log(result);
            return result;
        }
        
        function Register(email,password,cpassword){
            console.log(Users);
            Users.register.save({Email: email, Password : password, ConfirmPassword: cpassword}, function(result){
                console.log(result);
            });
        }
        
        function gUsers(){
            var us;
            console.log('blabla')
            Users.users.get(function(data){
                us = data;
                console.log(us);
                
            });
            return true;
        }
        
        return {
            GetLoggedIn : GetLoggedin,
            LogIn : LogIn,
            Register : Register,
            GetUsers : gUsers
        }
    }]);
    