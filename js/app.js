
/*
App Module
 */
var BlogzingaApp, BlogzingaConfiguration;

BlogzingaApp = (function() {
  function BlogzingaApp() {
    return ['ui.router', 'templates', 'bloglist', 'about', 'contribute'];
  }

  return BlogzingaApp;

})();

BlogzingaConfiguration = (function() {
  function BlogzingaConfiguration($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/blogs/list');
    $stateProvider.state('blogs', {
      abstract: true,
      url: '/blogs',
      views: {
        'template': {
          templateUrl: 'components/home.html'
        }
      }
    });
  }

  return BlogzingaConfiguration;

})();

angular.module('blogzinga', new BlogzingaApp()).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', BlogzingaConfiguration]);


/*
App Module
 */
var AboutApp, AboutConfiguration;

AboutApp = (function() {
  function AboutApp() {
    return ['ui.router', 'templates'];
  }

  return AboutApp;

})();

AboutConfiguration = (function() {
  function AboutConfiguration($stateProvider) {
    $stateProvider.state('blogs.about', {
      url: '/about',
      views: {
        '': {
          templateUrl: 'components/about/about.html'
        }
      }
    });
  }

  return AboutConfiguration;

})();

angular.module('about', new AboutApp()).config(['$stateProvider', AboutConfiguration]);


/*
App Module
 */
var BlogList, BlogListApp, BlogListConfiguration, BlogListService, Join, RandomHeader, RandomLabel, Search;

BlogListApp = (function() {
  function BlogListApp() {
    return ['ui.router', 'templates', 'ab-base64'];
  }

  return BlogListApp;

})();

BlogListConfiguration = (function() {
  function BlogListConfiguration($stateProvider) {
    $stateProvider.state('blogs.list', {
      url: '/list',
      views: {
        '': {
          templateUrl: 'components/bloglist/list.html',
          controller: 'blogListController'
        }
      }
    });
  }

  return BlogListConfiguration;

})();

BlogList = (function() {
  function BlogList($scope, BlogListService, base64) {
    BlogListService.getBlogs().then(function(resp) {
      $scope.blogs = _.sortBy(resp, 'title');
    });
    $scope.openUrl = function(url) {
      return window.open(url);
    };
    $scope.filterByTag = function(tag) {
      if (!$scope.filterBlog) {
        return $scope.filterBlog = tag;
      } else {
        return $scope.filterBlog += ' ' + tag;
      }
    };
  }

  return BlogList;

})();

BlogListService = (function() {
  function BlogListService($http, base64) {
    return {
      getBlogs: function() {
        return $http.get('https://api.github.com/repos/cosenonjaviste/blogzinga/contents/blogs.json?ref=gh-pages').then(function(resp) {
          var base64Content;
          base64Content = resp.data.content;
          return angular.fromJson(base64.decode(base64Content));
        });
      }
    };
  }

  return BlogListService;

})();

Join = (function() {
  function Join() {
    return function(value) {
      return typeof value.join === "function" ? value.join(', ') : void 0;
    };
  }

  return Join;

})();

RandomHeader = (function() {
  function RandomHeader() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        var classes, random;
        classes = ['panel-primary', 'panel-success', 'panel-warning', 'panel-danger', 'panel-info'];
        random = function() {
          return Math.floor(Math.random() * (classes.length - 1));
        };
        $element.parent().addClass(classes[random()]);
      }
    };
  }

  return RandomHeader;

})();

RandomLabel = (function() {
  function RandomLabel() {
    return {
      restict: 'A',
      link: function($scope, $element, $attrs) {
        var classes, random;
        classes = ['label-primary', 'label-success', 'label-warning', 'label-danger', 'label-info'];
        random = function() {
          return Math.floor(Math.random() * (classes.length - 1));
        };
        return $element.addClass(classes[random()]);
      }
    };
  }

  return RandomLabel;

})();

Search = (function() {
  function Search($filter) {
    return function(list, searchString) {
      var result, tokens;
      if (searchString) {
        tokens = searchString.split(' ');
        result = [];
        _.each(tokens, function(token) {
          var lookup;
          lookup = $filter('filter')(list, token);
          if (result.length === 0) {
            result = lookup;
          }
          if (lookup.length > 0) {
            return result = _.intersection(result, lookup);
          }
        });
        return result;
      } else {
        return list;
      }
    };
  }

  return Search;

})();

angular.module('bloglist', new BlogListApp()).config(['$stateProvider', BlogListConfiguration]).controller('blogListController', ['$scope', 'BlogListService', 'base64', BlogList]).factory('BlogListService', ['$http', 'base64', BlogListService]).filter('join', [Join]).directive('randomHeader', [RandomHeader]).directive('randomLabel', [RandomLabel]).filter('search', ['$filter', Search]);


/*
App Module
 */
var ContributeApp, ContributeConfiguration;

ContributeApp = (function() {
  function ContributeApp() {
    return ['ui.router', 'templates'];
  }

  return ContributeApp;

})();

ContributeConfiguration = (function() {
  function ContributeConfiguration($stateProvider) {
    $stateProvider.state('blogs.contribute', {
      url: '/contribute',
      views: {
        '': {
          templateUrl: 'components/contribute/contribute.html'
        }
      }
    });
  }

  return ContributeConfiguration;

})();

angular.module('contribute', new ContributeApp()).config(['$stateProvider', ContributeConfiguration]);

//# sourceMappingURL=maps/app.js.map