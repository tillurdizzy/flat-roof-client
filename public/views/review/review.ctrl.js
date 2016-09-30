'use strict';
angular.module('app').controller('ReviewCtrl', myFunction);

myFunction.$inject = ['$scope', '$state', 'SharedSrvc', 'DB'];

function myFunction($scope, $state, SharedSrvc, DB) {

    var me = this;
    var DB = DB;
    var traceMe = true;
    me.S = SharedSrvc;
    me.propertyName = "";
    me.propertyAddress = "";


   function initCtrl(){
        me.propertyAddress = me.S.returnPropertyAddress();
        me.propertyName = me.S.returnPropertyName();
   }

    function trace(msg) {
        if (traceMe == true) {
            console.log(ME + msg);
        }
    };

   
    $scope.$watch('$viewContentLoaded', function() {
       initCtrl();
    });

}
