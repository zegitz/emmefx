(function () {
    'use strict';

    angular.module('emmefxApp')
	.controller('datactrl', datactrl)

function datactrl($resource) {
    var vm = this;
    $resource('/js/data.json').query().$promise.then(function(persons) {
        vm.persons = persons;
		console.log(vm.persons);
    });
}
})(); 