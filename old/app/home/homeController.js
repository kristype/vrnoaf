angular
    .module('app')
    .controller('homeController', homeController);

homeController.$inject = ['dataService', '$location'];

function homeController(dataService, $location) {
  var vm = this;
  vm.title = 'Virtual Royal Norwegian Air Force';
  vm.posts = { };
  vm.nextPageExists = false;

  vm.nextPage = function() {
    $location.url('/page/2');
  }

  var page = 1;
  var getPostsPromise = dataService.getPosts(page);
  var checkNextPageExistsPromise = dataService.checkNextPageExists(page);

  getPostsPromise.then(function setPosts(data){
      vm.posts = data;
      checkNextPageExistsPromise
        .then(function setNextPageExists(pageExist){
          vm.nextPageExists = pageExist;
      });
    });
}
