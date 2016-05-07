angular.module('issueTracker.dashboard', [])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/dashboard',{
                resolve : {
                    authenticated : function ($location, auth){
                        var result = auth.GetLoggedIn();
                        if(result){
                            return true;
                        }else{
                            $location.path('/')
                            return false; 
                        }
                    },
                    me : function(auth){
                        return auth.GetMe().then(function(response){
                            return response.data;
                        });
                    }
                },
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController'
            })
    }])
    .controller('dashboardController',['$scope','$location','authenticated','me','auth','appUser',function($scope,$location, authenticated, me, auth, appUser){
        $scope.showUserInfo = true;
        $scope.userInfo = me;
        $scope.userInfo.isAdmin = $scope.userInfo.isAdmin ? 'Yes' : 'No';
        
        $scope.logOut = function() {
            auth.Logout().then(function(data){
                $location.path('#/');
            });
        }
        $scope.user = appUser.userName;
        $scope.authenticated = appUser.logged;
        
        $scope.projects = [
            {
                name: "Project 1",
                description : "Description 1",
                link: "#"
            },
            {
                name: "Project 2",
                description : "Description 2",
                link: "#"
            },
            {
                name: "Project 3",
                description : "Description 3",
                link: "#"
            }
        ];
        
        $scope.issues = [
            {
                project : 'Project 1',
                name : 'Issue for project 1',
                dueDate : new Date(),
                link: "#"
            },
            {
                project : 'Project 2',
                name : 'Issue for project 2',
                dueDate : new Date(),
                link: "#"
            },
            {
                project : 'Project 3',
                name : 'Issue for project 3',
                dueDate : new Date(),
                link: "#"
            }
        ];
        
        
    }]);