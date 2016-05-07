angular.module('issueTracker.project',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id',{
            
            templateUrl:'templates/project.html',
            controller:'projectController'
        })
    }])
    .controller('projectController', [
        '$scope',
        '$routeParams',
        function($scope,$routeParams){
            $scope.title = 'Title';
            $scope.projectId = $routeParams.id;
            $scope.description = "Project description goes here"
            $scope.author = 'Author';
            $scope.content = 'Content here';
            $scope.issues = [
                {
                    title:'Title 1',
                    issueId: "#123123",
                    description: 'Description 1',
                    link: '/testLink1'
                },
                {
                    title:'Title 2',
                    issueId: "#321334",
                    description: 'Description 2',
                    link: '/testLink2'
                },
                {
                    title:'Title 3',
                    issueId: "#532452",
                    description: 'Description 3',
                    link: '/testLink3'
                },
            ]
        }
    ]);