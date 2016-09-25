(function () {
  'use strict';

  var shoppingList = [
    {name: "apples", quantity: "7"},
    {name: "watermellons", quantity: "2"},
    {name: "mangoes", quantity: "4"},
    {name: "bags of spinach", quantity: "2"},
    {name: "pinapples", quantity: "2"},
    {name: "pack of grapes", quantity: "3"},
    {name: "tomatoes", quantity: "5"}

  ];

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyShoppingController($scope, ShoppingListCheckOffService) {

    var controller = this;
    var service = ShoppingListCheckOffService;

    controller.items = service.getToBuyItems();

    controller.everythingBought = function() {
      return controller.items.length === 0;
    }

    controller.buyItem = function(index) {
      service.buyItem(index);
    };

  }

  AlreadyBoughtShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {

    var controller = this;
    var service = ShoppingListCheckOffService;

    controller.items = service.getAlreadyBoughtItems();

    controller.somethingBought = function() {
      return controller.items.length === 0;
    }

  }


  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = shoppingList;
    var alreadyBought = [];

    service.getToBuyItems = function() {
      return toBuy;
    }

    service.getAlreadyBoughtItems = function() {
      return alreadyBought;
    }

    service.buyItem = function(index) {
      var item = toBuy [index];
      alreadyBought.push(item);
      toBuy.splice(index, 1);
    }
  }

})
();
