angular.module('issueTracker.dashboard', [])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/dashboard',{
                resolve : {
                    authenticated : function ($q, $location, auth){
                        var result = auth.GetLoggedIn();
                        if(result){
                            return $q.when(true);
                        }else{
                            $location.path('/')
                            return $q.reject('Not Authenticated'); 
                        }
                    },
                    projects: function($q, auth, appUser){
                        var deferred = $q.defer();
                        
                        
                        auth.GetUserProjects().then(function(response){
                            console.log(response);
                            deferred.resolve(response.data);
                        },function(error){
                            deferred.reject(error);
                        })
                        
                        return deferred.promise;
                    }
                },
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController'
            })
    }])
    .controller('dashboardController',['$scope','$location','auth','appUser','projects',function($scope,$location, auth, appUser, projects){
        $scope.showUserInfo = true;
        $scope.userInfo = appUser.me;
        if(!appUser.me){
            auth.GetMe().then(function(response){
                $scope.userInfo = appUser.me;
                $scope.showAdminButtons = appUser.me.isAdmin;
            });
        }
        
        $scope.logOut = function() {
            auth.Logout();
        }
        
        $scope.user = appUser.userName;
        $scope.projects = projects.Projects;
        
        
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