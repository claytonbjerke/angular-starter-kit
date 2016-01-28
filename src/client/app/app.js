(function () {
    'use strict';

    angular.module('angularStarterKit', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {

        var clientApp = '/src/client/app/';

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: clientApp + 'layout/layout.html',
                controller: 'layoutController',
                controllerAs: 'layoutController'
            })
            .state('app.example-1', {
                url: '/example-1',
                templateUrl: clientApp + 'example-1-module/example-1.html',
                controller: 'example1Controller',
                controllerAs: 'example1Controller'
            })
            .state('app.example-2', {
                url: '/example-2',
                templateUrl: clientApp + 'example-2-module/example-2.html',
                controller: 'example2Controller',
                controllerAs: 'example2Controller'
            });

        $urlRouterProvider.otherwise('/app/example-1');
    });
})();
