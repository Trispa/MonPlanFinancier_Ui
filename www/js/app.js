// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('tabs',{
        url:'/tab',
        abstract: true,
        templateUrl:'templates/tabs.html'
      })
      .state('tabs.listCarteCredits',{
        url:'/listCarteCredits',
        views:{
          'listCarteCredits-tab':{
            templateUrl:'templates/listCarteCredits.html',
            controller : 'ListCreditController'
          }
        }
      })
      .state('tabs.home',{
        url:'/home',
        views:{
          'home-tab':{
            templateUrl:'templates/home.html'
          }
        }
      })
    $urlRouterProvider.otherwise('/tab/home');
  })
  .controller('ListCreditController',['$scope','$http', function($scope, $http){
      $http.get('js/planData.json').success(function (data) {
        $scope.monPlan = data;
        $scope.onCarteItemDelete=function(item){
          $scope.monPlan.dette.carteCredits.splice($scope.monPlan.dette.carteCredits.indexOf(item),1);
        }
        $scope.doRefresh = function(){
          $http.get('js/planData.json').success(function (data) {
            $scope.monPlan = data;
            $scope.$broadcast('scroll.refreshComplete');
          });

        }
        $scope.toggleStar=function(item) {
          item.star = !item.star;
        }
        $scope.moveItem = function(item, fromIndex ,toIndex){
          $scope.monPlan.dette.carteCredits.splice(fromIndex, 1);
          $scope.monPlan.dette.carteCredits.splice(toIndex,0,item);
        };


      });
  }]);


