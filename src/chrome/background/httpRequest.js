'use strict';
var TIMEOUT = 2000;


function sendXMLHttpRequest(url, successCallback, failureCallback) {
    var xmlRequest;

    xmlRequest = new XMLHttpRequest();
    xmlRequest.open('GET', url);
    xmlRequest.timeout = TIMEOUT;

    xmlRequest.onreadystatechange = function() {
        if (xmlRequest.readyState === 4) {
            if (xmlRequest.status === 200) {
                successCallback(xmlRequest.responseText);
            } else if (xmlRequest.status === 404) {
                xmlRequest.abort();
                failureCallback();
            }
        }
    };

    xmlRequest.ontimeout = function() {
        xmlRequest.abort();
        failureCallback();
    };

    xmlRequest.onerror = function() {
        xmlRequest.abort();
        failureCallback();
    };

    xmlRequest.send();
}


function attemptRequest(url, successCallback, failureCallback, retryCount) {
    retryCount = retryCount || 0;

    if (retryCount >= 3) {
        console.log('Couldn\'t reach ' + url);
        failureCallback();
    } else {
        console.log('Attempting to reach ' + url + ' - Attempt number: ' + retryCount);
        sendXMLHttpRequest(url, function(responseText) {
            console.log('Ayy... ' + url);
            successCallback(responseText);
        }, function() {
            console.log('Retrying...');
            attemptRequest(url, successCallback, failureCallback, retryCount + 1);
        });
    }
}


module.exports = function(url) {
    return new Promise(function(resolve, reject) {
        attemptRequest(url, resolve, reject, 0);
    });
};