'use strict';




angular.module('ndzExplorer', ['ngRoute','ui.bootstrap'])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/blocks', {
                templateUrl: 'views/blocks.html',
                controller: 'blocksCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/transaction/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfo.html',
                controller: 'addressInfoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(function($rootScope) {
        var web3 = require('web3')

        var eth_node_url = 'http://localhost:7331'; // TODO: remote URL
	web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
        $rootScope.web3 = web3;
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
        }
        var connected = false;
        if(!web3.isConnected()) {
            swal({
                title: 'Cant connect to Nodez...',
                text: 'Try running your local node using <br>ndz --rpc --rpccorsdomain "'+ window.location.protocol + '//' + window.location.host + '"',
                type: 'error',
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton:false
              })
        }
    });
