'use strict';
angular.module('app').controller('NavCtrl',myFunction);

myFunction.$inject = ['$scope','$state','$location','SharedSrvc'];

function myFunction($scope,$state,$location,SharedSrvc) { 
	
	var Me = this;
	var S = SharedSrvc;

	Me.jobSelected = false;
	Me.inputOpen = false;
	Me.designOpen = false;
	Me.resultOpen = false;

    Me.materialsComplete = false;
    Me.laborComplete = false;
    Me.contractComplete = false;

	Me.goNav = function(st){
		$state.transitionTo(st);
	};

	Me.isCurrentPath = function (path) {
        var x = $location.path();
        var xSplit = x.split('/')
        var y = xSplit[1];
       
        return y == path;
    };

    Me.toggleInput = function(){
    	Me.inputOpen = !Me.inputOpen;
    };

     Me.toggleDesign = function(){
    	Me.designOpen = !Me.designOpen;
    };

     Me.toggleResult = function(){
    	Me.resultOpen = !Me.resultOpen;
    };


    $scope.$on("jobSelectEvent", function(event,bol) {
        Me.jobSelected = bol;
    });

    $scope.$on("materialsComplete", function(event,bol) {
        Me.materialsComplete = true;
    });

    $scope.$on("laborComplete", function(event,bol) {
        Me.laborComplete = true;
    });

    $scope.$on("contractComplete", function(event,bol) {
        Me.contractComplete = true;
    });


 };