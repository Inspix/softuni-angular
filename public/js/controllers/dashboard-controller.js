angular.module('issueTracker.dashboard', [])
    .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/dashboard',{
                resolve : {
                    auth : function (auth){
                    console.log('resolve called');
                    console.log(auth);
                    return auth.GetLoggedIn();
                    }
                },
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController'
            })
    }])
    .controller('dashboardController',['$scope','auth',function($scope,auth){
        console.log('logged in' + auth)
        $scope.user = "Pesho";
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
        ]
    }]);