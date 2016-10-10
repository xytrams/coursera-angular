(function() {
  'use strict';

  angular.module('Data')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['items'];
  function CategoriesController(items) {
    var categoriesCtrl = this;
    categoriesCtrl.items = items.data;
  };

})();
