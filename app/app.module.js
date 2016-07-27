angular
  .module('app', ["ngRoute", "ngSanitize"])
  .config(routing)
  .run(reload);

function routing($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "app/home/home.html", controller: "homeController", controllerAs: 'vm' })
            .when("/ts", { templateUrl: "app/ts/ts.html", controller: "pageCtrl", controllerAs: 'vm' })
            .when("/about", { templateUrl: "app/about/about.html", controller: "pageCtrl", controllerAs: 'vm' })
            .when("/notfound", { templateUrl: "app/404/404.html", controller: "pageCtrl", controllerAs: 'vm' })
            .otherwise({ redirectTo: "/notfound" });
    }

    function reload($route)  {
        $route.reload();
    }

    angular
        .module('app')
        .controller('pageCtrl', pageCtrl);

    function pageCtrl() {
        var vm = this;
        vm.title = 'Virtual Royal Norwegian Air Force';
    }
