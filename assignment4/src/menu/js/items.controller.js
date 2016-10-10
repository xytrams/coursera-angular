(function() {
  'use strict';

  angular.module('Data')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['menuitems'];
  function ItemsController(menuitems) {
    var itemsCtrl = this;
    itemsCtrl.items = menuitems.data.menu_items;
    itemsCtrl.categoryname = menuitems.data.category.name;
  };

})();
