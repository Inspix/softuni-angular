angular.module("issueTracker.api", [
    'ngResource'
    ])
    .constant('apiData',{
        url: 'http://softuni-issue-tracker.azurewebsites.net/'        
    })
    .factory('REST', ['$http','$cookies','apiData','appUser', function($http, $cookies, apiData,appUser){
        var defaultHeaders = {
            'Content-Type' : 'application/json'
        };
        
        function Execute(params){
            var req = {
                method: params.method || 'GET',
                headers : params.headers || defaultHeaders,
                url: apiData.url + params.url,
                data: params.data,
            };
            return $http(req)
        }
        
        var main = {
            execute : Execute,
            register : function(userData){
                var parameters = {
                    method:'POST', 
                    data: userData,
                    url: 'api/Account/Register'
                };
                return Execute(parameters);
            },
            login : function(userData){
                 var parameters = {
                    method:'POST', 
                    data: userData, 
                    url: 'api/Token', 
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                
                return Execute(parameters);
            },
            logout : function(){
                var parameters = {
                    method:'POST', 
                    url: 'api/Account/Logout', 
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            changePassword: function(userData){
                var parameters = {
                    method:'POST',
                    url: 'api/Account/ChangePassword',
                    data: userData,
                    headers : {
                        'Authorization': appUser.authString,
                        'Content-Type': 'application/json'
                    }
                };
                return Execute(parameters);
            },
            getUsers: function(query){
                var parameters = {
                    method: 'GET',
                    url: 'Users',
                    data : query,
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            me : function(){
                var parameters = {
                    method: 'GET',
                    url: 'Users/me',
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            makeAdmin: function(userId){
                var parameters = {
                    method: 'PUT',
                    url: 'Users/makeAdmin',
                    data: {
                        UserId: userId
                    },
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getLabels: function(params){
                var parameters = {
                    method: 'GET',
                    data: params,
                    url: 'Labels',
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getProjects : function(params){
                var parameters = {
                    method: 'GET',
                    url: 'Projects/' + params.id,
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getAllProjects : function(){
                var parameters = {
                    method: 'GET',
                    url: 'Projects/',
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getUserProjects : function(filter){
                var parameters = {
                    method: 'GET',
                    url: 'Projects/' + filter,
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            addProject : function(params){
                var parameters = {
                    method : 'POST',
                    url: 'Projects',
                    data: params,
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(params);
            },
            editProject: function(params,id){
                var parameters = {
                    method: 'PUT',
                    url : 'Projects/' + id,
                    data: params,
                    headers : {
                        'Authorization': appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getProjectIssues: function(params){
                var parameters = {
                    method: "GET",
                    url : 'Projects/:id/Issues',
                    data: params,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getIssues : function(id){
                var parameters = {
                    method: 'GET',
                    url: 'Issues/'+ id,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getMyIssues: function(params){
                var parameters = {
                    method: 'GET',
                    url: 'Issues/me',
                    data: params || {},
                    headers : {
                        'Authorization' : appUser.authString
                    }
                }
            },
            addIssue: function(params){
                var parameters = {
                    method: "POST",
                    url: 'Issues',
                    data: params,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            },
            editIssue: function(params){
                var parameters = {
                    method: 'PUT',
                    url: 'Issues',
                    data: params,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            },
            changeIssueStatus: function(params){
                var parameters = {
                    method: 'PUT',
                    url: 'Issues/:id/changestatus',
                    data: params,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            },
            getIssueComments: function(params,success, failure){
                var parameters = {
                    method: "GET",
                    url: "Issues/:id/comments",
                    data: params,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            },
            addIssueComment: function(params){
                var parameters = {
                    method: "POST",
                    url: 'Issues/:id/comments',
                    data: params,
                    headers : {
                        'Authorization' : appUser.authString
                    }
                };
                return Execute(parameters);
            }
        }
        return main;
    }]);