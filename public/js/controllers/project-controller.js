angular.module('issueTracker.project',[])
    .config(['$routeProvider', function($routeProvider){
        var resolves = {
            authenticated : function ($q, $location, auth){
                var result = auth.GetLoggedIn();
                if(result){
                    return $q.when(true);
                }else{
                    $location.path('/')
                    return $q.reject('Not Authenticated'); 
                }
            }
        };
        
        
        $routeProvider.when('/Project/:id',{
            resolve : resolves.authenticated,
            templateUrl:'templates/project.html',
            controller:'projectController'
        })
        .when('/Project/:id/edit',{
            resolve : resolves.authenticated,
            templateUrl: 'templates/project-edit.html',
            controller: 'projectEditController'
        })
    }])
    .controller('projectController', [
        '$scope',
        '$routeParams',
        '$location',
        'auth',
        'appUser',
        function($scope,$routeParams,$location,auth, appUser){
           
            auth.GetProject($routeParams.id).then(function(response){
                console.log(response.data);
                $scope.title = response.data.Name;
                $scope.projectId = response.data.ProjectKey;
                $scope.description = response.data.Description;
                $scope.author = response.data.Lead.Username;
                $scope.canChange = response.data.Lead.Id == appUser.me.Id || appUser.me.isAdmin; 
            },function(error){
                console.log(error.data);
            });
            
            $scope.addIssue = function(){};
            $scope.goToEdit = function(){
                $location.path($location.path() + '/edit');
            }
            $scope.logOut = function() {
                auth.Logout().then(function(response){
                    $location.path('#/');
                });
            }   
            
            $scope.goBack = function(){
                window.history.back();
            };
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
    ])
    .controller('projectEditController',[
        '$scope',
        '$routeParams',
        '$location',
        '$filter',
        '$timeout',
        'auth',
        'appUser',
        function($scope,$routeParams,$location,$filter,$timeout, auth, appUser){
            $scope.show = false;
            $scope.existingLabel = '';
            $scope.existingPriority = '';
            auth.GetProject($routeParams.id).then(function(result){
                console.log(result);
                if(appUser.me.isAdmin || result.data.Lead.Id == appUser.me.Id){
                    $scope.data = result.data;
                    $scope.data.LabelNames = [];
                    $scope.data.PriorityNames = [];
                    angular.forEach(result.data.LabelNames,function(value,index){
                        $scope.data.LabelNames.push(value.Name);
                    });
                     angular.forEach(result.data.PriorityNames,function(value,index){
                        $scope.data.PriorityNames.push(value.Name);
                    });
                    $scope.isAdmin = appUser.me.isAdmin;
                    $scope.show = true;
                }else{
                    $location.path('/dashboard');
                }
            });
            
            
            $scope.addLabel = function(label){
                var hasMatch = false;
                
                angular.forEach($scope.data.LabelNames,function(item){
                    if(item.Name == label)
                        hasMatch = true;
                })
                
                if(!hasMatch){
                    $scope.data.LabelNames.push({id:'NEW',Name:label});
                }else{
                    $scope.existingLabel = 'Label already exist';
                    $timeout(function(){
                        $scope.existingLabel = '';
                    },2500);
                }
                
            };
            
            $scope.deleteLabel = function(label){
                $scope.data.LabelNames = $filter('filter')($scope.data.LabelNames,function(value,index){
                    return value.Name != label;
                });
            };
            
            var newPriorities = [];
            
            $scope.addPriority = function(priority){
                var hasMatch = false;
                
                angular.forEach($scope.data.PriorityNames,function(item){
                    if(item.Name == priority)
                        hasMatch = true;
                })
                
                if(!hasMatch){
                    newPriorities.push(priority);
                    $scope.data.PriorityNames.push({id:'NEW',Name:priority});
                }else{
                    $scope.existingPriority = 'Priority already exist';
                    $timeout(function(){
                        $scope.existingPriority = '';
                    },2500);
                }
                
            };
            
            $scope.deletePriority = function(priority){
                $scope.data.PriorityNames = $filter('filter')($scope.data.PriorityNames,function(value,index){
                    return value.Name != priority;
                });
            };
            
            $scope.submit = function(data){
                console.log(data);
                $scope.saving = true;
                var neededData = {
                    Name: data.Name,
                    Description : data.Description,
                    Labels : data.Labels,
                    Priorities : data.Priorities,
                    LeadId : data.Lead.Id,
                }
                auth.EditProject(neededData,data.Id).then(function(response){
                    $location.path('/dashboard');
                },function(error){
                    console.log(error);
                })
            };
            
            $scope.goBack = function(){
                window.history.back();
            };
            
            $scope.logOut = function() {
                auth.Logout().then(function(response){
                    $location.path('#/');
            });
        }   
        }
    ]);