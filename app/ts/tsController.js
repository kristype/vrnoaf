angular
    .module('app')
    .controller('tsController', tsController);

aboutController.$inject = ['dataService', 'appConfig'];

function tsController(dataService, appConfig) {
  var vm = this;
  vm.tsContent = '';

  dataService.getPageContent(appConfig.tsContentPageId).then(setTsContent);

  function setTsContent(data){
    vm.tsContent = data;
  };
}
