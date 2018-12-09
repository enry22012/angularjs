app.controller('SignupCtrl', function($scope, $http) {
    $scope.usernameChange = function() {
        $scope.userForm.username.$error = {};
    }
    $scope.submitForm = function() {
        $scope.submitted = true;
        if ($scope.userForm.$valid) {
            let headers = {}
            let data = {
                "username": $scope.userForm.username.$modelValue,
                "email": $scope.userForm.email.$modelValue,
                "password": $scope.userForm.password.$modelValue
            };
            data = JSON.stringify(data)
            $http.post('/signup', data).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    console.log(`User ${response.data.username} has registered`)
                }
            })
                .catch(function(reject) {
                    $scope.userForm.username.$error.isTaken = true;
                    $scope.userForm.username.$invalid = true;
                    console.log(reject);
                });
        }
    }
});