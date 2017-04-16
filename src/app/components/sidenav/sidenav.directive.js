export function SidenavDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/sidenav/sidenav.html',
    controller: SidenavController,
    controllerAs: 'vm'
  };

  return directive;
}

class SidenavController {
  constructor ($location) {
    'ngInject';

    this.$location = $location;

    this.menu = [{
      title: 'Overview',
      url: '/overview',
      link: 'home'
    }];
  }

  isActive (location) {
    return location === this.$location.path();
  }
}
