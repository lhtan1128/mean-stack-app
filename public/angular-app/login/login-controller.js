angular.module('meanhotel').controller('LoginController',LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){
    var vm = this;

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    }

    vm.login = function(){
        if(vm.username && vm.password){
            var user ={
                username: vm.username,
                password: vm.password
            }

            $http.post('/api/users/login',user).then(function(response){
                if(response.data.success){

                    // start of * Set token *
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    var loggedInUser = decodedToken.username;
                    // end of * Set token *
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/')
    }

    vm.isActive = function(url){
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    }
}