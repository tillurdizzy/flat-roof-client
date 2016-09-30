'use strict';
angular.module('app').factory('SharedSrvc', SharedSrvc);

SharedSrvc.$inject = ['$rootScope', 'DB'];

function SharedSrvc($rootScope, DB) {
    var self = this;
    var traceMe = true;
    var myID = "SharedSrvc: ";

    self.jobObj = {};
    var jobData = {};
    var jobContract = {};
    var contractDate = 0;

   
    self.initSrvc = function(){
        // called in app run block
    }
    
    self.logIn = function(jobObj) {
        self.jobObj = jobObj;
        jobData = JSON.parse(self.jobObj.data);
        jobContract = JSON.parse(self.jobObj.contract);
        contractDate = new Date(self.jobObj.submitted);
    };

    self.returnPropertyAddress = function(){
        var str = "";
        str = jobData.street + ", " + jobData.city + " " + jobData.state;
        return str;
    };

    self.returnPropertyName = function(){
        return jobData.property;
    };


    self.pushData = function(obj, set) {
        var jsonStr = JSON.stringify(obj);
        trace(myID + "pushData : " + jsonStr);
        var DBQuery = "update" + set;
        var dataObj = {};
        dataObj.jobID = selectedJobID;
        dataObj.data = jsonStr;
        DB.query(DBQuery, dataObj); 
    };

    self.returnData = function(set) {
        var rtnObj = {};
        switch (set) {
            case "ADMIN":
                rtnObj = ADMIN;
                break;
        };
        return rtnObj;
    };

    function trace(msg) {
        if (traceMe == true) {
            console.log(msg);
        }
    };
   
    function clone(obj) {
        var copy;
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = self.clone(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = self.clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    return self;

};
