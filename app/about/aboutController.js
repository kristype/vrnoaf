angular
    .module('app')
    .controller('aboutController', aboutController);

aboutController.$inject = ['dataService'];

function aboutController(dataService) {
  var vm = this;
  vm.aboutContent = '';

  dataService.getAboutContent().then(setAboutContent);

  function setAboutContent(data){
    vm.aboutContent = data;
  };
}
