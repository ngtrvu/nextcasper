function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var moment = _interopDefault(require('moment'));
var Link = _interopDefault(require('next/link'));
var _ = require('.');
var GhostContentAPI = _interopDefault(require('@tryghost/content-api'));

var getIMGXUrl = function getIMGXUrl(url, width, height, autoFormat) {
  if (autoFormat === void 0) {
    autoFormat = true;
  }
  if (!url) return null;
  if (!width & !height) {
    width = 474;
    height = 256;
  }
  if (url.startsWith('https://images.unsplash.com/')) {
    var regex = /\&w=[\d]+/g;
    return url.replace(regex, "&w=" + width);
  }
  url = url.replace('https://localinsider.storage.googleapis.com/', 'https://localinsider.imgix.net/');
  var arr = [];
  if (height) arr.push("height=" + height);
  if (width) arr.push("width=" + width);
  if (autoFormat) arr.push("auto=format&q=80");
  var params = arr.join('&');
  if (url.includes('?')) {
    return url + "&" + params;
  }
  return url + "?" + params;
};

function FeatureIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "17",
    viewBox: "0 0 16 17",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.49365 4.58752C3.53115 6.03752 2.74365 7.70002 2.74365 9.25002C2.74365 10.6424 3.29678 11.9778 4.28134 12.9623C5.26591 13.9469 6.60127 14.5 7.99365 14.5C9.38604 14.5 10.7214 13.9469 11.706 12.9623C12.6905 11.9778 13.2437 10.6424 13.2437 9.25002C13.2437 6.00002 10.9937 3.50002 9.16865 1.68127L6.99365 6.25002L4.49365 4.58752Z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

function component(_ref) {
  var post = _ref.post,
    _ref$isLarge = _ref.isLarge,
    isLarge = _ref$isLarge === void 0 ? false : _ref$isLarge,
    _ref$isDynamic = _ref.isDynamic,
    isDynamic = _ref$isDynamic === void 0 ? false : _ref$isDynamic;
  var url = "/post/" + post.slug + "/" + post.id;
  var authors = post.authors,
    tags = post.tags;
  var author = authors[0];
  var classNames = [];
  if (isLarge) classNames.push('post-card-large');
  if (isDynamic) classNames.push('dynamic');
  if (!post.access) classNames.push("post-access-" + post.visibility);
  return /*#__PURE__*/React.createElement("article", {
    className: "post-card post " + classNames.join(' ')
  }, /*#__PURE__*/React.createElement(Link, {
    href: url,
    className: "post-card-image-link"
  }, /*#__PURE__*/React.createElement("img", {
    className: "post-card-image",
    sizes: "(max-width: 1000px) 400px, 800px",
    src: post && post.feature_image ? isLarge || isDynamic ? getIMGXUrl(post.feature_image, 900, 450) : getIMGXUrl(post.feature_image, 600, 300) : null
  }), post.title), /*#__PURE__*/React.createElement("div", {
    className: "post-card-content"
  }, /*#__PURE__*/React.createElement(Link, {
    href: url,
    className: "post-card-content-link"
  }, /*#__PURE__*/React.createElement("header", {
    className: "post-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-card-tags"
  }, tags && tags[0] ? /*#__PURE__*/React.createElement("span", {
    className: "post-card-primary-tag"
  }, tags[0].name) : null, post.featured ? /*#__PURE__*/React.createElement("span", {
    className: "post-card-featured"
  }, /*#__PURE__*/React.createElement(FeatureIcon, null), " Featured") : null), /*#__PURE__*/React.createElement("h2", {
    className: "post-card-title"
  }, post.title)), /*#__PURE__*/React.createElement("div", {
    className: "post-card-excerpt"
  }, post.excerpt)), /*#__PURE__*/React.createElement("footer", {
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-card-meta"
  }, authors ? /*#__PURE__*/React.createElement("ul", {
    className: "author-list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "author-list-item"
  }, /*#__PURE__*/React.createElement(Link, {
    href: "/author/" + author.slug,
    className: ""
  }, authors.map(function (_) {
    return _.name;
  }).join(',')))) : null, /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\u2014"), /*#__PURE__*/React.createElement("time", {
    className: "post-card-meta-date",
    dateTime: post.published_at
  }, moment(post.published_at).format('YYYY-MM-DD')), post.reading_time && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\u2014"), /*#__PURE__*/React.createElement("span", {
    className: "post-card-meta-length"
  }, post.reading_time, " min read"))))));
}

function component$1(_ref) {
  var settings = _ref.settings;
  if (!settings) return 'error';
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer outer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("section", {
    className: "copyright"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, settings.title), " \xA9 ", new Date().getFullYear()), /*#__PURE__*/React.createElement("nav", {
    className: "site-footer-nav"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav"
  }, settings.secondary_navigation.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("li", {
      key: idx,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement(Link, {
      href: item.url
    }, item.label));
  })))));
}

function component$2(_ref) {
  var settings = _ref.settings;
  var facebook = settings.facebook,
    twitter = settings.twitter;
  var twitterUrl = "https://twitter.com/" + twitter;
  var facebookUrl = "https://www.facebook.com/" + facebook;
  return /*#__PURE__*/React.createElement("header", {
    id: "gh-head",
    className: "gh-head outer"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "gh-head-inner inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gh-head-brand"
  }, /*#__PURE__*/React.createElement(Link, {
    href: "/",
    className: "gh-head-logo no-image"
  }, settings.title), /*#__PURE__*/React.createElement("div", {
    className: "gh-head-brand-wrapper"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gh-head-menu"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav"
  }, settings.navigation.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("li", {
      key: idx,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement(Link, {
      href: item.url
    }, item.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gh-head-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gh-social"
  }, facebook ? /*#__PURE__*/React.createElement("a", {
    className: "gh-social-link gh-social-facebook",
    href: facebookUrl,
    title: "Facebook",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
  }))) : null, twitter ? /*#__PURE__*/React.createElement("a", {
    className: "gh-social-link gh-social-twitter",
    href: twitterUrl,
    title: "Twitter",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
  }))) : null))));
}

function ProfileIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.513 18.998C4.749 15.504 8.082 13 12 13s7.251 2.504 8.487 5.998C18.47 21.442 15.417 23 12 23s-6.47-1.558-8.487-4.002zM12 12c2.21 0 4-2.79 4-5s-1.79-4-4-4-4 1.79-4 4 1.79 5 4 5z",
    fill: "#FFF"
  })));
}

var ensureContent = function ensureContent(content) {
  if (!content) return null;
  var mycontent = content;
  mycontent = fixImgUrl(mycontent);
  var regex = /"(https:\/\/localinsider.storage.googleapis.com\/){1}([a-zA-Z0-9-_\/.]+)"/g;
  mycontent = mycontent.replace(regex, 'https://localinsider.imgix.net/$2');
  return mycontent;
};
function fixImgUrl(html) {
  var regex = /src="(https:\/\/localinsider.storage.googleapis.com\/){1}([a-zA-Z0-9-_\/.]+)"/g;
  return html.replace(regex, "src='https://localinsider.imgix.net/$2?width=800'");
}

function component$3(_ref) {
  var page = _ref.page;
  return /*#__PURE__*/React.createElement("main", {
    id: "site-main",
    className: "site-main"
  }, /*#__PURE__*/React.createElement("article", {
    className: "article page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "article-header gh-canvas"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "article-title"
  }, page.title), page.custom_excerpt ? /*#__PURE__*/React.createElement("p", {
    className: "article-excerpt"
  }, page.custom_excerpt) : null, /*#__PURE__*/React.createElement("div", {
    className: "article-byline"
  }, /*#__PURE__*/React.createElement("section", {
    className: "article-byline-content"
  })), page.feature_image ? /*#__PURE__*/React.createElement("figure", {
    className: "article-image"
  }, /*#__PURE__*/React.createElement("img", {
    srcSet: _.getIMGXUrl(page.feature_image, 300) + " 300w\n                " + _.getIMGXUrl(page.feature_image, 600) + " 600w,\n                " + _.getIMGXUrl(page.feature_image, 1000) + " 1000w,\n                " + _.getIMGXUrl(page.feature_image, 2000) + " 2000w",
    sizes: "(min-width: 1400px) 1400px, 92vw",
    src: "" + _.getIMGXUrl(page.feature_image, 1000)
  }), page.feature_image_caption ? /*#__PURE__*/React.createElement("figcaption", {
    dangerouslySetInnerHTML: {
      __html: page.feature_image_caption
    }
  }) : null) : null), /*#__PURE__*/React.createElement("section", {
    dangerouslySetInnerHTML: {
      __html: ensureContent(page.html)
    },
    className: "gh-content gh-canvas"
  }), /*#__PURE__*/React.createElement("aside", {
    className: "gh-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gh-toc"
  }))));
}

function component$4(_ref) {
  var post = _ref.post;
  var authors = post.authors,
    primary_tag = post.primary_tag;
  return /*#__PURE__*/React.createElement("main", {
    id: "site-main",
    className: "site-main"
  }, /*#__PURE__*/React.createElement("article", {
    className: "article post"
  }, /*#__PURE__*/React.createElement("header", {
    className: "article-header gh-canvas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article-tag post-card-tags"
  }, primary_tag ? /*#__PURE__*/React.createElement("span", {
    className: "post-card-primary-tag"
  }, /*#__PURE__*/React.createElement(Link, {
    href: "/tag/" + primary_tag.slug
  }, primary_tag.name)) : null, post.featured ? /*#__PURE__*/React.createElement("span", {
    className: "post-card-featured"
  }, /*#__PURE__*/React.createElement(_.FeatureIcon, null), " Featured") : null), /*#__PURE__*/React.createElement("h1", {
    className: "article-title"
  }, post.title), post.custom_excerpt ? /*#__PURE__*/React.createElement("p", {
    className: "article-excerpt"
  }, post.custom_excerpt) : null, /*#__PURE__*/React.createElement("div", {
    className: "article-byline"
  }, /*#__PURE__*/React.createElement("section", {
    className: "article-byline-content"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "author-list"
  }, authors.map(function (author) {
    return /*#__PURE__*/React.createElement("li", {
      key: author.id,
      className: "author-list-item"
    }, author.profile_image ? /*#__PURE__*/React.createElement(Link, {
      href: "/author/" + author.slug,
      className: "author-avatar"
    }, /*#__PURE__*/React.createElement("img", {
      className: "author-profile-image",
      src: author.profile_image,
      alt: author.name
    })) : /*#__PURE__*/React.createElement(Link, {
      href: "/author/" + author.slug,
      className: "author-avatar"
    }, /*#__PURE__*/React.createElement(_.ProfileIcon, null), " ", author.name));
  })), /*#__PURE__*/React.createElement("div", {
    className: "article-byline-meta"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "author-name"
  }, /*#__PURE__*/React.createElement(Link, {
    href: "/author/" + authors[0].slug
  }, authors.map(function (_) {
    return _.name;
  }).join(','))), /*#__PURE__*/React.createElement("div", {
    className: "byline-meta-content"
  }, /*#__PURE__*/React.createElement("time", {
    className: "byline-meta-date"
  }, moment(post.date).format('YYYY-MM-DD')), /*#__PURE__*/React.createElement("span", {
    className: "byline-reading-time"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bull"
  }, "\u2022"), " ", post.reading_time, " min read"))))), post.feature_image ? /*#__PURE__*/React.createElement("figure", {
    className: "article-image"
  }, /*#__PURE__*/React.createElement("img", {
    srcSet: _.getIMGXUrl(post.feature_image, 300) + " 300w\n                            " + _.getIMGXUrl(post.feature_image, 600) + " 600w,\n                            " + _.getIMGXUrl(post.feature_image, 1000) + " 1000w,\n                            " + _.getIMGXUrl(post.feature_image, 2000) + " 2000w",
    sizes: "(min-width: 1400px) 1400px, 92vw",
    src: "" + _.getIMGXUrl(post.feature_image, 1000),
    "ix-sizes": "auto"
  }), post.feature_image_caption ? /*#__PURE__*/React.createElement("figcaption", {
    dangerouslySetInnerHTML: {
      __html: post.feature_image_caption
    }
  }) : null) : null), /*#__PURE__*/React.createElement("section", {
    dangerouslySetInnerHTML: {
      __html: ensureContent(post.html)
    },
    className: "gh-content gh-canvas"
  }), /*#__PURE__*/React.createElement("aside", {
    className: "gh-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gh-toc"
  }))));
}

var getSection = function getSection() {
  try {
    var options = {
      filter: 'visibility:public',
      limit: 7,
      order: ['featured DESC', 'posts.count DESC']
    };
    return Promise.resolve(ghostApiCall({
      contentType: 'tags',
      params: options
    })).then(function (_ref9) {
      var tags = _ref9.tags;
      return tags ? Promise.all(tags.map(function (tag) {
        try {
          return Promise.resolve(getPostsByTag(tag.slug, {
            limit: 3
          })).then(function (_ref10) {
            var posts = _ref10.posts;
            return Object.assign(tag, {
              posts: posts
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      })) : null;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPostsByTags = function getPostsByTags(tags) {
  if (tags === void 0) {
    tags = [];
  }
  try {
    var tagList = tags.map(function (tag) {
      return tag.slug;
    }).join(',');
    var options = {
      limit: 6,
      filter: "tags:[" + tagList + "]",
      fields: listPostFields,
      include: ['tags', 'authors'],
      exclude: 'html',
      order: ['featured DESC', 'published_at DESC']
    };
    return ghostApiCall({
      contentType: 'authors',
      params: options
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getAuthorBySlug = function getAuthorBySlug(slug) {
  try {
    return ghostApiCall({
      contentType: 'authors',
      params: {
        slug: slug
      },
      type: 'read'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getTagBySlug = function getTagBySlug(slug) {
  try {
    return ghostApiCall({
      contentType: 'tags',
      params: {
        slug: slug
      },
      type: 'read'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getTags = function getTags(_ref8) {
  var _ref8$limit = _ref8.limit,
    limit = _ref8$limit === void 0 ? 'all' : _ref8$limit;
  try {
    return ghostApiCall({
      contentType: 'tags',
      params: {
        limit: limit
      }
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getSettings = function getSettings() {
  try {
    return ghostApiCall({
      contentType: 'settings'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getSinglePage = function getSinglePage(slug) {
  try {
    var options = {
      slug: slug,
      limit: 'all',
      order: ['featured DESC', 'published_at DESC'],
      page: 1
    };
    return ghostApiCall({
      contentType: 'pages',
      params: options,
      type: 'read'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPages = function getPages() {
  try {
    var options = {
      limit: 'all'
    };
    return ghostApiCall({
      contentType: 'pages',
      params: options
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getSinglePostById = function getSinglePostById(id) {
  try {
    var options = {
      id: id,
      include: ['tags', 'authors', 'count.posts']
    };
    return ghostApiCall({
      contentType: 'posts',
      params: options,
      type: 'read'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getSinglePostBySlug = function getSinglePostBySlug(slug) {
  try {
    var options = {
      slug: slug,
      include: ['tags', 'authors', 'count.posts']
    };
    return ghostApiCall({
      contentType: 'posts',
      params: options,
      type: 'read'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPostsByAuthor = function getPostsByAuthor(slug, _ref7) {
  var _ref7$limit = _ref7.limit,
    limit = _ref7$limit === void 0 ? 'all' : _ref7$limit;
  try {
    var options = {
      limit: limit,
      filter: "author:" + slug,
      fields: listPostFields,
      include: ['tags', 'authors'],
      order: ['featured DESC', 'published_at DESC']
    };
    return ghostApiCall({
      contentType: 'posts',
      params: options
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPostsByTag = function getPostsByTag(slug, _ref6) {
  var _ref6$limit = _ref6.limit,
    limit = _ref6$limit === void 0 ? 'all' : _ref6$limit;
  try {
    var options = {
      limit: limit,
      filter: "tag:" + slug,
      fields: listPostFields,
      include: ['tags', 'authors'],
      order: ['featured DESC', 'published_at DESC']
    };
    return ghostApiCall({
      contentType: 'posts',
      params: options
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPosts = function getPosts(_ref5) {
  var _ref5$limit = _ref5.limit,
    limit = _ref5$limit === void 0 ? 'all' : _ref5$limit;
  try {
    var options = {
      limit: limit,
      fields: listPostFields,
      include: ['tags', 'authors'],
      order: ['featured DESC', 'published_at DESC']
    };
    return ghostApiCall({
      contentType: 'posts',
      params: options
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getParamSerializer = function getParamSerializer(parameters) {
  var queryString = Object.keys(parameters).reduce(function (parts, k) {
    var val = encodeURIComponent([].concat(parameters[k]).join(','));
    return parts.concat(k + "=" + val);
  }, []).join('&');
  return queryString;
};
var fetchCall = function fetchCall(_ref) {
  var url = _ref.url,
    _ref$method = _ref.method,
    method = _ref$method === void 0 ? 'GET' : _ref$method,
    params = _ref.params;
  try {
    var queryString = getParamSerializer(params);
    var apiUrl = url + ("?" + queryString);
    return Promise.resolve(fetch(apiUrl, method)).then(function (res) {
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_CONTENT_URL,
  key: process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY,
  version: 'v5.0',
  makeRequest: fetchCall
});
var listPostFields = ['id', 'title', 'slug', 'description', 'visibility', 'feature_image', 'primary_author', 'access', 'featured', 'reading_time', 'excerpt', 'published_at', 'updated_at'];
var getGhostUrl = function getGhostUrl(_ref2) {
  var contentType = _ref2.contentType,
    params = _ref2.params,
    _ref2$type = _ref2.type,
    type = _ref2$type === void 0 ? 'browse' : _ref2$type;
  var ghostUrl = process.env.NEXT_PUBLIC_GHOST_CONTENT_URL;
  var key = process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY;
  var url = ghostUrl + "/ghost/api/content/" + contentType + "/";
  if (type == 'read') {
    if (params && params.id) {
      url = "" + url + params.id + "/";
      delete params.id;
    } else if (params && params.slug) {
      url = url + "slug/" + params.slug + "/";
      delete params.slug;
    }
  }
  if (key) {
    url = url + "?key=" + key;
  }
  if (params) {
    var queryString = getParamSerializer(params);
    url = url + "&" + queryString;
  }
  return url;
};
var ghostApiCall = function ghostApiCall(_ref3) {
  var contentType = _ref3.contentType,
    params = _ref3.params,
    _ref3$type = _ref3.type,
    type = _ref3$type === void 0 ? 'browse' : _ref3$type;
  try {
    var url = getGhostUrl({
      contentType: contentType,
      params: params,
      type: type
    });
    console.log(url);
    return Promise.resolve(fetch(url)).then(function (response) {
      if (!response.ok) {
        console.error('not ok');
        return {};
      }
      return Promise.resolve(response.json()).then(function (data) {
        if (type == 'read') {
          var items = data ? data[contentType] : [];
          if (items && items.length > 0) {
            var _ref4;
            return _ref4 = {}, _ref4[contentType] = items[0], _ref4;
          }
          return {};
        }
        return data;
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var api$1 = {
  __proto__: null,
  getSection: getSection,
  getPostsByTags: getPostsByTags,
  getAuthorBySlug: getAuthorBySlug,
  getTagBySlug: getTagBySlug,
  getTags: getTags,
  getSettings: getSettings,
  getSinglePage: getSinglePage,
  getPages: getPages,
  getSinglePostById: getSinglePostById,
  getSinglePostBySlug: getSinglePostBySlug,
  getPostsByAuthor: getPostsByAuthor,
  getPostsByTag: getPostsByTag,
  getPosts: getPosts
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var isoDatetime = function isoDatetime(timeData) {
  if (!timeData) {
    return undefined;
  }
  if (typeof timeData === 'string') return moment(timeData).toISOString();
  if (!Number.isNaN(timeData)) return moment.unix(timeData).toISOString();
  return timeData;
};

var webUrl = process.env.NEXT_PUBLIC_WEB_URL;
var getMetadata = function getMetadata(settings, headProps) {
  if (headProps === void 0) {
    headProps = {};
  }
  var siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.url;
  var defaultProps = {
    title: settings.meta_title || settings.title || 'Local Insider | Travel like a local',
    description: settings.meta_description || settings.description || 'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    url: settings.url,
    siteName: settings.siteName
  };
  var metaProps = _extends({}, defaultProps, headProps, {
    ogTitle: headProps.og_title || headProps.title || settings.og_title || defaultProps.title,
    ogDescription: headProps.og_description || headProps.description,
    ogImage: headProps.og_image || headProps.photo || settings.og_image || defaultProps.photo,
    twitterTitle: headProps.twitterTitle || headProps.title || settings.title,
    twitterImage: headProps.twitterImage || headProps.photo || settings.og_image || 'https://localinsider.storage.googleapis.com/2022/09/LOGO-4.png',
    twitterDescription: headProps.twitterDescription || headProps.description || 'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    ogUrl: headProps.og_url || headProps.canonical || defaultProps.url,
    canonical: headProps.canonical
  });
  return {
    metadataBase: new URL(webUrl),
    title: metaProps.title,
    description: metaProps.description,
    alternates: {
      canonical: metaProps.canonical
    },
    openGraph: {
      title: metaProps.title,
      description: metaProps.description,
      url: webUrl,
      siteName: settings.title,
      images: [],
      locale: 'en_US',
      type: 'website'
    }
  };
};
var getPostMetadata = function getPostMetadata(_ref) {
  var post = _ref.post,
    settings = _ref.settings;
  if (!post) {
    return getMetadata(settings);
  }
  var headProps = {
    title: settings.title ? post.title + " | " + settings.title : post.title,
    description: post.custom_excerpt || post.excerpt,
    canonical: "/post/" + post.slug + "/" + post.id
  };
  var openGraph = {
    title: post.title,
    description: headProps.description,
    images: [post.feature_image],
    type: 'article',
    publishedTime: isoDatetime(post.published_at),
    modifiedTime: isoDatetime(post.updated_at)
  };
  return _extends({}, getMetadata(settings, headProps), {
    openGraph: openGraph
  });
};
var getPageMetadata = function getPageMetadata(_ref2) {
  var page = _ref2.page,
    settings = _ref2.settings;
  var headProps = {
    title: settings.title ? page.title + " | " + settings.title : page.title,
    description: page.custom_excerpt || page.excerpt,
    canonical: "/page/" + page.slug
  };
  var openGraph = {
    title: page.title,
    description: headProps.description,
    images: [page.feature_image],
    type: 'article',
    publishedTime: isoDatetime(page.published_at),
    modifiedTime: isoDatetime(page.updated_at)
  };
  return _extends({}, getMetadata(settings, headProps), {
    openGraph: openGraph
  });
};
var getTagMetadata = function getTagMetadata(_ref3) {
  var tag = _ref3.tag,
    settings = _ref3.settings;
  var headProps = {
    title: settings.title ? tag.title + " | " + settings.title : tag.title,
    description: tag.custom_excerpt || tag.excerpt,
    canonical: "/tag/" + tag.slug
  };
  var openGraph = {
    title: tag.title,
    description: headProps.description,
    images: [tag.feature_image],
    type: 'article',
    publishedTime: isoDatetime(tag.published_at),
    modifiedTime: isoDatetime(tag.updated_at)
  };
  return _extends({}, getMetadata(settings, headProps), {
    openGraph: openGraph
  });
};
var getAuthorMetadata = function getAuthorMetadata(_ref4) {
  var author = _ref4.author,
    settings = _ref4.settings;
  var headProps = {
    title: settings.title ? author.name + " | " + settings.title : author.name,
    description: author.bio,
    canonical: "/author/" + author.slug
  };
  var openGraph = {
    title: author.name,
    description: headProps.description,
    images: [author.feature_image],
    type: 'article',
    publishedTime: isoDatetime(author.published_at),
    modifiedTime: isoDatetime(author.updated_at)
  };
  return _extends({}, getMetadata(settings, headProps), {
    openGraph: openGraph
  });
};

var styles = {"test":"_styles-module__test__3ybTi"};

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

exports.ExampleComponent = ExampleComponent;
exports.FeatureIcon = FeatureIcon;
exports.Footer = component$1;
exports.Header = component$2;
exports.PageTemplate = component$3;
exports.PostCard = component;
exports.PostTemplate = component$4;
exports.ProfileIcon = ProfileIcon;
exports.getAuthorMetadata = getAuthorMetadata;
exports.getIMGXUrl = getIMGXUrl;
exports.getMetadata = getMetadata;
exports.getPageMetadata = getPageMetadata;
exports.getPostMetadata = getPostMetadata;
exports.getTagMetadata = getTagMetadata;
exports.ghostApi = api$1;
//# sourceMappingURL=index.js.map
