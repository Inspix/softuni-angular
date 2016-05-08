angular.module('issueTracker',[
    'ngRoute',
    'ngAnimate', 
    'issueTracker.users',
    'issueTracker.issues',
    'issueTracker.profile',
    'issueTracker.project',
    'issueTracker.project.all',
    'issueTracker.dashboard',
    'issueTracker.auth',
    'ui.bootstrap'
    ])
    .value('appUser', {
        userName: undefined,
        logged: undefined,
        expires: undefined,
        isAdmin: undefined,
        authString : '0',
        logging : true,
        me : undefined
    }).config(['$routeProvider', function($routeProvider){
        
        $routeProvider
            .when('/logout',{
            resolve: {
                authenticated : function ($location, auth){
                    return auth.Logout().then(function(response){
                        $location.path('#/');
                    })
                }
            }})
            .otherwise({ redirectTo: '/'});
    }])
    .run(['$cookies','appUser',function($cookies, appUser){
        var me = $cookies.getObject('me');
        if(me)
            appUser.me = me;
        var token = $cookies.getObject('auth-token');
        
        if(token){
            appUser.userName = token.userName;
            var expirationDate = new Date(token['.expires']);
            appUser.authString = 'Bearer ' + token.access_token;
            appUser.logged = token != undefined && expirationDate > new Date();
            appUser.expires = expirationDate;
        }
    }]);
    