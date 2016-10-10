(function () {
  'use strict';


  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true,
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {

    var controller = this;
    var service = MenuSearchService;

    controller.searchTerm = "";
    controller.emptySearch = false;

    controller.search = function() {
      controller.found = [];
      controller.searchTerm = controller.searchTerm.toLowerCase().trim();

      if (controller.searchTerm.length > 0) {
        var promise = service.getMatchedMenuItems(controller.searchTerm);
        promise.then(function(response) {
          controller.found = response;
          controller.emptySearch = controller.searchTerm.length === 0 || controller.found.length === 0 ? true : false;

          return controller.found;
        }).catch(function(error) {
          console.log("Something went terribly wrong.");
        });
      } else {
        controller.emptySearch = true;
      }

      return controller.found;
    }

    controller.removeItem = function (index) {
      controller.lastRemoved = controller.found[index].name;
      console.log("Last removed item : " + controller.lastRemoved);
      controller.found.splice(index, 1);
    }

  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMenuItems = function() {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;

    }

    service.getMatchedMenuItems = function(searchTerm) {

      return service.getMenuItems().then(function (result) {

        var all = result.data.menu_items;
        var foundItems = [];
        for (var i = 0; i < all.length; i ++) {
          var menuItem = all[i];
          if (menuItem.description.toLowerCase().indexOf(searchTerm) > -1) {
                foundItems.push(menuItem);
          }
        }

        return foundItems;
      });
    }

  }

})
();
