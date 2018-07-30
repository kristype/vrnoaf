angular
    .module('app')
    .controller('pageController', pageController);

pageController.$inject = ['dataService', '$routeParams', '$location'];

function pageController(dataService, $routeParams, $location) {
  var page = $routeParams.page;
  var vm = this;
  vm.posts = { };
  vm.nextPageExists = false;

  vm.nextPage = function() {
    var pageUrl = ['/page/', parseInt(page)+1]
    $location.url(pageUrl.join(''));
  }

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
