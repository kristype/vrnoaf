var app = angular.module("app", ["ngRoute"]);

app.config([
"$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "app/home/home.html", controller: "PageCtrl" })
            .when("/ts", { templateUrl: "app/ts/ts.html", controller: "PageCtrl" })
            .when("/about", { templateUrl: "app/about/about.html", controller: "PageCtrl" })
            .otherwise("/404", { templateUrl: "app/404/404.html", controller: "PageCtrl" });
    }
]);

app.controller("PageCtrl",
    function(/* $scope, $location, $http */) {
    });
