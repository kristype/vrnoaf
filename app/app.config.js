angular
    .module('app')
    .factory('appConfig', appConfig);

function appConfig() {
  return {
    wpApiUrl: 'http://wp.vrnoaf.no/wp-json/wp/v2/',
    postsPerPage: 5,
    aboutContentPageId: 33,
    tsContentPageId: 133,
  }
}
