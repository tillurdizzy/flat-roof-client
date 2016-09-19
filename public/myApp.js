'use strict';
angular.module('app', ['ui.router','ngUnderscore'])
    .config(initRouter)
    .run(runBlock);

initRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function initRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "views/home/home.html"
    })

};



runBlock.$inject = ['SharedSrvc'];

function runBlock(SharedSrvc) {
    SharedSrvc.initSrvc();
};
