'use strict';
angular.module('app').factory('SharedSrvc', SharedSrvc);

SharedSrvc.$inject = ['$rootScope', 'DB'];

function SharedSrvc($rootScope, DB) {
    var traceMe = true;
    var myID = "SharedSrvc: ";

    var service = {
        pushData: pushData,
        initSrvc: initSrvc,
        returnData: returnData,
        clone: clone,
    };

    return service;

    function trace(msg) {
        if (traceMe == true) {
            console.log(msg);
        }
    };

    function initSrvc() {
        
    };


    function pushData(obj, set) {
        var jsonStr = JSON.stringify(obj);
        trace(myID + "pushData : " + jsonStr);
        var DBQuery = "update" + set;
        var dataObj = {};
        dataObj.jobID = selectedJobID;
        dataObj.data = jsonStr;
        DB.query(DBQuery, dataObj);
        
    };

    function returnData(set) {
        var rtnObj = {};
        switch (set) {
            case "ADMIN":
                rtnObj = ADMIN;
                break;
           
        };
        return rtnObj;
    };

    function setLayers() {
        LAYERS = {
            layerOne: { layer: '', thickness: '' },
            layerTwo: { layer: '', thickness: '' },
            layerThree: { layer: '', thickness: '' },
            layerFour: { layer: '', thickness: '' },
            layerFive: { layer: '', thickness: '' },
            layerSix: { layer: '', thickness: '' },
            RPANEL: { height: '', width: '', winged: '', insulation: '' }
        };
        return LAYERS;
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

};
