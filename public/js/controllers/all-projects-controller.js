angular.module('issueTracker.project.all',[])
    .config(['$routeProvider', function($routeProvider){
        var resolves = {
            authenticated : function ($q, $location, auth, appUser){
                var deferred = $q.defer();
                
                var result = auth.GetLoggedIn();
                console.log('resolve');
                if(result && appUser.me && appUser.me.isAdmin){
                    console.log('success');
                    deferred.resolve(true);
                }else{
                    console.log('failsed');
                    $location.path('#/')
                    deferred.reject('not authenticated'); 
                }
                return deferred.promise;
            }
        };
        
        $routeProvider.when('/Projects',{
            resolve : resolves.authenticated,
            templateUrl:'templates/all-projects.html',
            controller:'allProjectController'
        })
    }])
    .controller('allProjectController', [
        '$scope',
        '$routeParams',
        'auth',
        'appUser',
        function($scope,$routeParams,auth, appUser){
            $scope.offset = 0;
            $scope.maxSize = 10;
            
            auth.GetAllProjects().then(function(response){
                console.log(response.data);
                $scope.projects = response.data;
                $scope.totalItems = response.data.length;
                $scope.currentPage = 1;

            },function(error){
                console.log(error.data);
            });

            $scope.pageChanged = function() {
                $scope.offset = $scope.currentPage * $scope.maxSize;
            };
            
            $scope.logOut = function() {
                auth.Logout().then(function(response){
                    $location.path('#/');
            });
        }      
            
           
        }
    ])