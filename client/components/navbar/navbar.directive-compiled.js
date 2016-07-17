'use strict';

angular.module('yeelightApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
});

//# sourceMappingURL=navbar.directive-compiled.js.map