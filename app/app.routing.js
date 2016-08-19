angular
  .module('app')
  .config(routing)
  .run(reload);

function routing($routeProvider) {
      $routeProvider
          .when("/", { templateUrl: "app/home/home.html", controller: "homeController", controllerAs: 'vm' })
          .when("/ts", { templateUrl: "app/ts/ts.html" })
          .when("/about", { templateUrl: "app/about/about.html", controller: "aboutController", controllerAs: 'vm' })
          .when("/page/:page", { templateUrl: "app/page/page.html", controller: "pageController", controllerAs: 'vm' })
          .when("/notfound", { templateUrl: "app/404/404.html" })
          .otherwise({ redirectTo: "/notfound" });
  }

  function reload($route)  {
      $route.reload();
  }
