let app = angular.module('angularApp', ["ngRoute"]);
app.constant('ROUTES', (function() {
    return {
        HOME: '/',
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
        ABOUT: '/about'
    }
})());
app.config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
    let pathToViews = '/views/';
    $routeProvider.when(ROUTES.HOME, {templateUrl: pathToViews + 'home.html'});
    $routeProvider.when(ROUTES.LOGIN, {templateUrl: pathToViews + 'user/login/index.html', controller: 'LoginCtrl'});
    $routeProvider.when(ROUTES.SIGNUP, {templateUrl: pathToViews + 'user/signup/index.html', controller: 'SignupCtrl'});
    $routeProvider.when(ROUTES.ABOUT, {templateUrl: pathToViews + 'about.html'});
}]);

app.controller('navbarCtrl', function ($scope, $http, $rootScope, $location, ROUTES) {
    $scope.siggout = function() {
        $rootScope.signUser = null;
        $location.path(ROUTES.LOGIN);
    }
})