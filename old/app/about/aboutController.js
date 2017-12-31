angular
    .module('app')
    .controller('aboutController', aboutController);

aboutController.$inject = ['dataService', 'appConfig'];

function aboutController(dataService, appConfig) {
  var vm = this;
  vm.aboutContent = '';

  dataService.getPageContent(appConfig.aboutContentPageId).then(setAboutContent);

  function setAboutContent(data){
    vm.aboutContent = data;
  };
}
