var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "app/home/home.html", controller: "PageCtrl" })
            .when("/ts", { templateUrl: "app/ts/ts.html", controller: "PageCtrl" })
            .when("/about", { templateUrl: "app/about/about.html", controller: "PageCtrl" })
            .when("/notfound", { templateUrl: "app/404/404.html", controller: "PageCtrl" })
            .otherwise({ redirectTo: "/notfound" });
    });

app.controller("PageCtrl",
    function(/* $scope, $location, $http */) {
    });

app.run(
    function($route)  {
        $route.reload();
    });
