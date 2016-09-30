'use strict';
angular.module('app', ['ui.router', 'ngUnderscore'])
    .config(initRouter)
    .run(runBlock);

initRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function initRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login/client-login.html"
        })

        .state('login.invalid', {
            url: "/invalid",
            templateUrl: "views/login/client-login-invalid.html"
        })
        .state('login.success', {
            url: "/success",
            templateUrl: "views/login/client-login-success.html"
        })

    	.state('review', {
            url: "/review",
            templateUrl: "views/review/review.html"
        })
        .state('approval', {
            url: "/approval",
            templateUrl: "views/approval.html"
        })

	    .state('home', {
	        url: "/home",
	        templateUrl: "views/home/home.html"
	    })

};



runBlock.$inject = ['SharedSrvc'];

function runBlock(SharedSrvc) {
    SharedSrvc.initSrvc();
};
