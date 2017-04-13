export function ItemsDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/items/items.html',
    controller: ItemsController,
    controllerAs: 'vm'
  };

  return directive;
}

class ItemsController {
  constructor (itemsService, $rootScope) {
    'ngInject';

    this.loaded = false;
    this.activeItemIndex = -1;

    this.title = '';
    this.text = '';
    this.itemsService = itemsService;

    $rootScope.$on('$destroy', $rootScope.$on('items:updated', () => {
      this.items = itemsService.getItems();
      this.loaded = true;
    }));
  }

  addComment() {
    if (this.text === '' || /^\s+$/.test(this.text)) { return; }

    if(this.activeItemIndex === -1){
      // Should call alert box with message here
      this.text = '';
      return;
    }

    this.loaded = false;

    this.itemsService.addComment(this.activeItemIndex, this.text.trim()).then((items) => {
      this.items = items;
      this.text = '';
      this.loaded = true;
    });
  }

  addItem(title) {
    if (title === '' || /^\s+$/.test(title)) { return; }

    this.loaded = false;

    this.itemsService.addItem(title.trim()).then((items) => {
      this.items = items;
      this.title = '';
      this.loaded = true;
    });
  }

  deleteItem(index) {
    this.itemsService.deleteItem(index).then((items) => {
      this.activeItemIndex = -1;
      this.items = items;
    });
  }

  selectItem(index) {
    this.activeItemIndex = index;
  }
}
