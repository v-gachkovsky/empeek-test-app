export function config ($logProvider, localStorageServiceProvider, toastrConfig) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  localStorageServiceProvider
    .setPrefix('empeekTaskApp');

  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 5000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
