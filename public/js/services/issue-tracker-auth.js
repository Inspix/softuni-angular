angular.module('issueTracker.auth',[])
    .factory("auth",["$http",function($http){
        var loggedIn = true;
        
        function GetLoggedin(){
            return loggedIn;
        };
        
        function LogIn(userName,password){
            // TODO
            var result = true;
            
            loggedIn = true;
            return result;
        };
        
        return {
            GetLoggedIn : GetLoggedin,
            LogIn : LogIn
        }
    }]);