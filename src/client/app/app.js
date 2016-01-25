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
            })
            .state('app.example', {
                url: '/example',
                templateUrl: clientApp + 'example-module/example.html',
                controller: 'exampleController',
                controllerAs: 'exampleController'
            });

         $urlRouterProvider.otherwise('/app/example');
    });
})();
