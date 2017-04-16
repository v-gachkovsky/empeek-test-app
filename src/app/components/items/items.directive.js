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
  constructor (itemsService, $rootScope, toastr) {
    'ngInject';

    this.itemsLoaded = false;
    this.commentsLoaded = false;
    this.activeItemIndex = -1;

    this.title = '';
    this.text = '';
    this.itemsService = itemsService;
    this.toastr = toastr;

    $rootScope.$on('$destroy', $rootScope.$on('items:updated', () => {
      this.items = itemsService.getItems();
      this.itemsLoaded = true;
      this.commentsLoaded = true;
    }));
  }

  addComment() {
    const itemNotSelected = this.activeItemIndex === -1;
    if(itemNotSelected){
      this.showErrorMessage('Please select item first');
      this.text = '';
      return;
    }

    if (ItemsController.isEmpty(this.text)) {
      this.showErrorMessage('Please enter your comment first');
      return;
    }

    this.commentsLoaded= false;

    this.itemsService.addComment(this.activeItemIndex, this.text.trim()).then((items) => {
      this.items = items;
      this.text = '';
      this.commentsLoaded = true;
    });
  }

  addItem() {
    if (ItemsController.isEmpty(this.title)) {
      this.showErrorMessage('Please enter item title first');
      return;
    }

    this.itemsLoaded = false;

    this.itemsService.addItem(this.title.trim()).then((items) => {
      this.items = items;
      this.title = '';
      this.itemsLoaded = true;
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

  showErrorMessage(message) {
    this.toastr.error(message);
  }

  // Helpers
  static isEmpty(string) {
    return string === '' || /^\s+$/.test(string);
  }
}
