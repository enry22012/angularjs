app.controller('LoginCtrl', function($scope, $http) {
    $scope.subminForm = function () {
        if ($scope.loginForm.$valid) {
            let data = {
                username: $scope.loginForm.username.$modelValue,
                password: $scope.loginForm.password.$modelValue
            };
            data = JSON.stringify(data);
            $http.post('/login', data).then(response => {
                if (response.status === 200){
                    console.log(`User login!`)
            }
            })

        }
    }
});