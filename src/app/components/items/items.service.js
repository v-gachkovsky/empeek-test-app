// I use $timeout(s) to demonstrate data loading delay

export class ItemsService {
  constructor($timeout, $q, $rootScope, localStorageService) {
    'ngInject';

    this.q = $q;
    this.timeout = $timeout;
    this.storage = localStorageService;
    this.rootScope = $rootScope;

    this.colors = ['#47568c', '#ff8a00'];
    this.currentColor = false; // I have 2 colors, 0 and 1 indexes. false == 0, true == 1

    if(!this.items){
      this.reload();
    }else{
      $rootScope.$broadcast('items:updated');
    }
  }

  reload() {
    this.promise = this.loadItems();

    this.promise.then((items) => {
      this.items = items ? items : [];
      this.rootScope.$broadcast('items:updated');
    });

    return this.promise;
  }

  loadItems() {
    return this.q((resolve) => {
      this.timeout(() => {
       resolve(angular.fromJson(this.storage.get('items')));
      }, 1000);
    });
  }

  getItems() {
    return this.items;
  }

  addItem(title) {
    return this.q((resolve) => {
      this.timeout(() => {
        this.items.push({
          title: title,
          comments: []
        });

        this.storage.set('items', angular.toJson(this.items));
        resolve(this.items);
      }, 500);
    });
  }

  deleteItem(index) {
    return this.q((resolve) => {
      this.timeout(() => {
        this.items.splice(index, 1);

        this.storage.set('items', angular.toJson(this.items));
        resolve(this.items);
      }, 500);
    });
  }

  addComment(index, text) {
    const color = this.colors[+this.currentColor];

    this.currentColor = !this.currentColor;

    return this.q((resolve) => {
      this.timeout(() => {
        this.items[index].comments.push({
          text: text,
          avaColor: color
        });

        this.storage.set('items', angular.toJson(this.items));
        resolve(this.items);
      }, 500);
    });
  }
}
