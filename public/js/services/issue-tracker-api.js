angular.module("issueTracker.api", [
    'ngResource'
    ])
    .constant('apiData',{
        url: 'http://softuni-issue-tracker.azurewebsites.net/'        
    })
    .factory('Users', ['$resource','$cookies','apiData', function($resource, $cookies, apiData){
        function GetAuthString(){
            var str = 'Bearer ' + $cookies.get('auth-token');
            console.log(str);
            return str;
        };
        
        return {
            register : $resource(apiData.url + 'api/Account/Register'),
            
            login : $resource(apiData.url + 'api/Token', {}, {
                save : {headers : {'Content-Type': 'application/x-www-form-urlencoded'}, method : 'POST' }
            }),
            
            changePassword : $resource(apiData.url + 'api/Account/ChangePassword'),
            
            users : $resource(apiData.url + 'Users',{},{
                get : { headers : {'Authorization': GetAuthString()} , method: 'GET', isArray:true}
            }),
            
            me : $resource(apiData.url + 'Users/me'),
            
            makeAdmin : $resource(apiData.url + 'Users/makeadmin')
        }
    }])
    .factory('Labels',['$resource','apiData', function($resource,apiData){
        return $resource(apiData.url + 'Labels')
    }])
    .factory('Projects',['$resource', 'apiData', function($resource, apiData){
        return $resource(apiData.url + 'Projects/:id');
    }])
    .factory('Issues',['$resource', 'apiData', function($resource, apiData){
        return {
            projectIssues : $resource(apiData.url + 'Project/:id/Issues', {id : '@id'}),
            issues : $resource(apiData.url + 'Issues/:id',{id : '@id'}),
            changeStatus : $resource(apiData.url + 'Issues/:id/changestatus', {id : '@id'}),
            comment : $resource(apiData.url + 'Issues/:id/comments', {id : '@id'})            
        }
    }])