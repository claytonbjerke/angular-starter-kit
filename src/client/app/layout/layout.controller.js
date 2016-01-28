/* jshint -W040 */

(function () {

    'use strict';

    angular.module('angularStarterKit').controller('layoutController', [layoutController]);

    function layoutController() {

        console.log('Layout Controller');

        var vm = this;

        var statics = {
            emptyString: ''
        };

        vm.example1Active = 'active';
        vm.example2Active = statics.emptyString;

        vm.tabSelect = function (tabName) {
            if (vm.example1Active && tabName !== 'example1') {
                vm.example2Active = 'active';
                vm.example1Active = statics.emptyString;
            } else {
                vm.example1Active = 'active';
                vm.example2Active = statics.emptyString;
            }
        };
    }
}());
