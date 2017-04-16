import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { SidenavDirective } from '../app/components/sidenav/sidenav.directive';
import { ItemsDirective } from '../app/components/items/items.directive';
import { ItemsService} from '../app/components/items/items.service';

angular.module('empeekTaskApp', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ui.router',
  'ngMaterial',
  'toastr',
  'LocalStorageModule'
])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .service('itemsService', ItemsService)
  .directive('sidenav', SidenavDirective)
  .directive('items', ItemsDirective);
