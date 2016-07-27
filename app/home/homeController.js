angular
    .module('app')
    .controller('homeController', homeController);

function homeController($http) {
    var vm = this;
    vm.title = 'Virtual Royal Norwegian Air Force';
    vm.posts = { };

    $http({method: 'GET', url: 'http://wp.vrnoaf.no/wp-json/wp/v2/posts'} )
        .then(function successCallback(response) {
              vm.posts = response.data;
        });
}
