'use strict';

angular.module('yeelightApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});

//# sourceMappingURL=footer.directive-compiled.js.map