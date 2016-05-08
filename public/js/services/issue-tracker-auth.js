angular.module('issueTracker.auth',['issueTracker.api','ngCookies'])
    .config(['$httpProvider',function($httpProvider){
         $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }])
    
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
            });
        }
        
        function Register(email,password,cpassword){
            return REST.register({Email: email, Password : password, ConfirmPassword: cpassword});
        }
        
        function LogOut(){
            return REST.logout().then(function(result){
                $cookies.remove('auth-token');
                $cookies.remove('me');
                appUser.me = undefined;
                $location.path('#/');
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
            return REST.getProjects({id:id});
        }
        
        function GetUserProjects(){
            var filter = '?pageSize=' + 10 + '&pageNumber=' + 1 + '&filter=Lead.id == "' + appUser.me.Id + '"';
            return REST.getUserProjects(filter);
        }
        
        function GetAllProjects(){
            return REST.getAllProjects();
        }
        
        function GetMe(){
            return REST.me().then(function(response){
                $cookies.putObject('me',response.data);
                appUser.me = response.data;
                return response;
            });
        }
        
        function EditProject(data,id){
            return REST.editProject(data,id);
        }
        
        function GetIssue(id){
            return REST.getIssues(id);
        }
        
        return {
            GetLoggedIn : GetLoggedin,
            LogIn : LogIn,
            Logout : LogOut,
            Register : Register,
            GetUsers : gUsers,
            GetMe : GetMe,
            GetProject: GetProject,
            GetAllProjects : GetAllProjects,
            GetUserProjects: GetUserProjects,
            EditProject: EditProject,
            GetIssue : GetIssue
        }
    }]);
    