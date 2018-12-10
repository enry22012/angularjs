app.controller('LoginCtrl', function($scope, $http, $location, $rootScope) {
  $scope.submitForm = function () {
    if ($scope.loginForm.$valid) {
      let data = {
        username: $scope.loginForm.username.$modelValue,
        password: $scope.loginForm.password.$modelValue
      };
      data = JSON.stringify(data);
      $http.post('/login', data).then(response => {
        if (response.status === 200){
        console.log(response.data);
        $rootScope.signUser = response.data;
          $location.path('/');
          console.log(`User login!`);
        }
      })
    }
  }
});