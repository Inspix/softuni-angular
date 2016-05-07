angular.module('issueTracker.auth',['issueTracker.api','ngCookies'])
    .config(['$httpProvider',function($httpProvider){
         $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }])
    .value('appUser', {
        userName: undefined,
        logged: undefined,
        expires: undefined,
        isAdmin: undefined,
        authString : '0',
        logging : true
    })
    .factory("auth",["$http","$cookies",'$location',"REST",'appUser',function($http,$cookies,$location,REST,appUser){
        
        function GetLoggedin(){
            var token = $cookies.getObject('auth-token');
            if(token){
                appUser.userName = token.userName;
                var expirationDate = new Date(token['.expires']);
                appUser.authString = 'Bearer ' + token.access_token;
                appUser.logged = token != undefined && expirationDate > new Date();
                appUser.expires = expirationDate;
            }
            return token != undefined && appUser.logged;
        }
        
        function LogIn(email,password){
            return REST.login("Username=" + email + '&Password=' + password + '&grant_type=password')
            .then(function(response){
               var token = response.data;
               $cookies.putObject('auth-token',token);
               return token;
            });
        }
        
        function Register(email,password,cpassword){
            return REST.register({Email: email, Password : password, ConfirmPassword: cpassword});
        }
        
        function LogOut(){
            return REST.logout().then(function(result){
                $cookies.remove('auth-token');
                return result.data;
            });
        }
        
        function gUsers(){
            var us;
            REST.getUsers(undefined,function(data){
                us = data;
                console.log(us);
            });
            return true;
        }
        
        function GetProject(id){
            return REST.getProject({id:id});
        }
        
        function GetMe(){
            return REST.me();
        }
        
        return {
            GetLoggedIn : GetLoggedin,
            LogIn : LogIn,
            Logout : LogOut,
            Register : Register,
            GetUsers : gUsers,
            GetMe : GetMe
        }
    }]);
    