angular
    .module('app')
    .factory('dataService', dataService);

dataService.$inject = ['$http', 'appConfig'];

function dataService($http, appConfig) {
  var service =
  {
    getAboutContent: getAboutContent,
    getPosts: getPosts,
    checkNextPageExists: checkNextPageExists
  };
  return service;

  function getAboutContent() {
    var aboutContentUrl = [appConfig.wpApiUrl, 'pages/', appConfig.aboutContentPageId]
    return $http({method: 'GET', url: aboutContentUrl.join('')} )
        .then(successCallback);

    function successCallback(response) {
      return response.data.content.rendered;
    }
  }

  function checkNextPageExists(currentPage) {
    var peekPost = (currentPage * appConfig.postsPerPage) + 1;
    var postsUrl = [appConfig.wpApiUrl, 'posts?page=', peekPost, '&per_page=1']
    return $http({method: 'GET', url: postsUrl.join('')})
      .then(function confirmPageExist(response) {
        return response.data.length === 1;
      });
  }

  function getPosts(page) {
    var postsUrl = [appConfig.wpApiUrl, 'posts?page=', page, '&per_page=', appConfig.postsPerPage]
    return $http({method: 'GET', url: postsUrl.join('')})
        .then(getPostsSuccess);

    function getPostsSuccess(response) {
      return Promise.all([response, getAuthorsForPosts(response.data)])
        .then(function convertPosts(results){
          var index;
          var rawPosts = results[0].data;
          var posts = [results[0].data.length];
          var authors = results[1];
          for (index = 0; index < rawPosts.length; ++index) {
            var entry = rawPosts[index];
            var datetime = new Date(entry.date_gmt);

            posts[index] = {
              content: entry.content.rendered,
              title: entry.title.rendered,
              datetime: datetime.toLocaleString(),
              date: datetime.toLocaleDateString(),
              author: getAuthor(authors, entry.author)
            };
          }

          return posts;
        });
    }
  }

  function getAuthor(authors, authorId) {
    for (var i = 0; i < authors.length; i++) {
      var currentAuthor = authors[i];
      if (currentAuthor.id === authorId) {
        return currentAuthor.name;
      }
    }
    return '';
  }

  function getAuthorsForPosts(posts) {

    var ids = [];
    posts.forEach(function(post) {
      if (ids.indexOf(post.author) === -1) {
        ids.push(post.author);
      }
    });

    var authorsPromises = [];
    ids.forEach(function(authorId){
      var authorUrl = [appConfig.wpApiUrl, 'users/',authorId]
      var getAuthorPromise = $http({method: 'GET', url: authorUrl.join('')})
          .then(function getAuthorSuccess(response) {
            return { id: authorId, name: response.data.name  };
          });
      authorsPromises.push(getAuthorPromise);
    });

    return Promise.all(authorsPromises);
  }
}
