'use strict';
angular.module('app').controller('LoginCtrl', myFunction);

myFunction.$inject = ['$scope', '$state', 'SharedSrvc', 'DB'];

function myFunction($scope, $state, SharedSrvc, DB) {

    var me = this;
    var DB = DB;
    var S = SharedSrvc;

    me.displayName = "";

    me.isError = false;
    me.jobID = "";
    me.clientID = "";

    // Job Obj
    me.jobObj = {}; // http result

    function trace(msg) {
        if (traceMe == true) {
            console.log(ME + msg);
        }
    };

    me.continueBtn = function() {
        $state.transitionTo("review");
    };

    me.logOut = function() {
        me.displayName = "";
        S.logOut();
        DB.logOut();
        $state.transitionTo("login");
    };

    me.submitLoginForm = function() {
        me.isError = false;
        var dataObj = new Object();
        dataObj.clientID = this.clientID;
        dataObj.jobID = this.jobID;

        DB.query("getJobLogin", dataObj).then(function(resultObj) {
            if (resultObj.result == "Error" || typeof resultObj.data === "string") {
                alert("Query Error - see console for details");
                console.log("getJobLogin ---- " + resultObj.data);
            } else {
                if (resultObj.data.length == 0) {
                    me.onLogInFail();
                } else {
                    me.jobObj = resultObj.data[0];
                    me.onLogInSuccess();
                }
            }
        }, function(error) {
            alert("Query Error - LoginCtrl >> getJobLogin");
        });
    };

    me.onLogInSuccess = function() {
        var data = JSON.parse(me.jobObj.data);
        me.displayName = data.client;
        $state.transitionTo("login.success");
        S.logIn(me.jobObj);
    };

    me.onLogInFail = function() {
        me.isError = true;
    };


    $scope.$watch('$viewContentLoaded', function() {
        me.jobID = "";
        me.clientID = "";
    });

}
