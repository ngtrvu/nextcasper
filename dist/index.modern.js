import React$1, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GhostContentAPI from '@tryghost/content-api';

const getIMGXUrl = (url, width, height, autoFormat = true) => {
  if (!url) return null;
  if (!width & !height) {
    width = 474;
    height = 256;
  }
  if (url.startsWith('https://images.unsplash.com/')) {
    const regex = /\&w=[\d]+/g;
    return url.replace(regex, `&w=${width}`);
  }
  url = url.replace('https://localinsider.storage.googleapis.com/', 'https://localinsider.imgix.net/');
  let arr = [];
  if (height) arr.push(`height=${height}`);
  if (width) arr.push(`width=${width}`);
  if (autoFormat) arr.push(`auto=format&q=80`);
  const params = arr.join('&');
  if (url.includes('?')) {
    return `${url}&${params}`;
  }
  return `${url}?${params}`;
};

function FeatureIcon() {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: "16",
    height: "17",
    viewBox: "0 0 16 17",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M4.49365 4.58752C3.53115 6.03752 2.74365 7.70002 2.74365 9.25002C2.74365 10.6424 3.29678 11.9778 4.28134 12.9623C5.26591 13.9469 6.60127 14.5 7.99365 14.5C9.38604 14.5 10.7214 13.9469 11.706 12.9623C12.6905 11.9778 13.2437 10.6424 13.2437 9.25002C13.2437 6.00002 10.9937 3.50002 9.16865 1.68127L6.99365 6.25002L4.49365 4.58752Z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

function component({
  post,
  isLarge = false,
  isDynamic = false
}) {
  const url = `/post/${post.slug}/${post.id}`;
  const {
    authors,
    tags
  } = post;
  const author = authors[0];
  const classNames = [];
  if (isLarge) classNames.push('post-card-large');
  if (isDynamic) classNames.push('dynamic');
  if (!post.access) classNames.push(`post-access-${post.visibility}`);
  return /*#__PURE__*/React$1.createElement("article", {
    className: `post-card post ${classNames.join(' ')}`
  }, /*#__PURE__*/React$1.createElement(Link, {
    href: url,
    className: "post-card-image-link"
  }, /*#__PURE__*/React$1.createElement("img", {
    className: "post-card-image",
    sizes: "(max-width: 1000px) 400px, 800px",
    src: post && post.feature_image ? isLarge || isDynamic ? getIMGXUrl(post.feature_image, 900, 450) : getIMGXUrl(post.feature_image, 600, 300) : null
  }), post.title), /*#__PURE__*/React$1.createElement("div", {
    className: "post-card-content"
  }, /*#__PURE__*/React$1.createElement(Link, {
    href: url,
    className: "post-card-content-link"
  }, /*#__PURE__*/React$1.createElement("header", {
    className: "post-card-header"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "post-card-tags"
  }, tags && tags[0] ? /*#__PURE__*/React$1.createElement("span", {
    className: "post-card-primary-tag"
  }, tags[0].name) : null, post.featured ? /*#__PURE__*/React$1.createElement("span", {
    className: "post-card-featured"
  }, /*#__PURE__*/React$1.createElement(FeatureIcon, null), " Featured") : null), /*#__PURE__*/React$1.createElement("h2", {
    className: "post-card-title"
  }, post.title)), /*#__PURE__*/React$1.createElement("div", {
    className: "post-card-excerpt"
  }, post.excerpt)), /*#__PURE__*/React$1.createElement("footer", {
    className: ""
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "post-card-meta"
  }, authors ? /*#__PURE__*/React$1.createElement("ul", {
    className: "author-list"
  }, /*#__PURE__*/React$1.createElement("li", {
    className: "author-list-item"
  }, /*#__PURE__*/React$1.createElement(Link, {
    href: `/author/${author.slug}`,
    className: ""
  }, authors.map(_ => _.name).join(',')))) : null, /*#__PURE__*/React$1.createElement("span", {
    className: "sep"
  }, "\u2014"), /*#__PURE__*/React$1.createElement("time", {
    className: "post-card-meta-date",
    dateTime: post.published_at
  }, moment(post.published_at).format('YYYY-MM-DD')), post.reading_time && /*#__PURE__*/React$1.createElement(Fragment, null, /*#__PURE__*/React$1.createElement("span", {
    className: "sep"
  }, "\u2014"), /*#__PURE__*/React$1.createElement("span", {
    className: "post-card-meta-length"
  }, post.reading_time, " min read"))))));
}

function component$1({
  settings
}) {
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
  }, settings.secondary_navigation.map((item, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    href: item.url
  }, item.label)))))));
}

function component$2({
  settings
}) {
  const router = useRouter();
  const [isShowMenu, setShowMenu] = useState(false);
  const {
    facebook,
    twitter
  } = settings;
  const twitterUrl = `https://twitter.com/${twitter}`;
  const facebookUrl = `https://www.facebook.com/${facebook}`;
  useEffect(() => {
    if (isShowMenu) {
      document.querySelector('#next-body').classList.add('gh-head-open');
    } else {
      document.querySelector('#next-body').classList.remove('gh-head-open');
    }
  }, [isShowMenu]);
  useEffect(() => {
    setShowMenu(false);
  }, [router.asPath]);
  return /*#__PURE__*/React$1.createElement("header", {
    id: "gh-head",
    className: "gh-head outer"
  }, /*#__PURE__*/React$1.createElement("nav", {
    className: "gh-head-inner inner"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "gh-head-brand"
  }, /*#__PURE__*/React$1.createElement(Link, {
    href: "/",
    className: "gh-head-logo no-image"
  }, settings.title), /*#__PURE__*/React$1.createElement("div", {
    className: "gh-head-brand-wrapper"
  }, /*#__PURE__*/React$1.createElement("a", {
    className: "gh-burger",
    role: "button",
    onClick: () => {
      setShowMenu(!isShowMenu);
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "gh-burger-box"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "gh-burger-inner"
  }))))), /*#__PURE__*/React$1.createElement("div", {
    className: "gh-head-menu"
  }, /*#__PURE__*/React$1.createElement("ul", {
    className: "nav"
  }, settings.navigation.map((item, idx) => /*#__PURE__*/React$1.createElement("li", {
    key: idx,
    className: "nav-item"
  }, /*#__PURE__*/React$1.createElement(Link, {
    href: item.url
  }, item.label))))), /*#__PURE__*/React$1.createElement("div", {
    className: "gh-head-actions"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "gh-social"
  }, facebook ? /*#__PURE__*/React$1.createElement("a", {
    className: "gh-social-link gh-social-facebook",
    href: facebookUrl,
    title: "Facebook",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React$1.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
  }))) : null, twitter ? /*#__PURE__*/React$1.createElement("a", {
    className: "gh-social-link gh-social-twitter",
    href: twitterUrl,
    title: "Twitter",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React$1.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
  }))) : null))));
}

const getParamSerializer = parameters => {
  return Object.keys(parameters).reduce((parts, k) => {
    const val = encodeURIComponent([].concat(parameters[k]).join(','));
    return parts.concat(`${k}=${val}`);
  }, []).join('&');
};
const fetchCall = async ({
  url,
  method: _method = 'GET',
  params,
  headers
}) => {
  const queryString = getParamSerializer(params);
  const apiUrl = url + `?${queryString}`;
  const res = await fetch(apiUrl, _method);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_CONTENT_URL,
  key: process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY,
  version: 'v5.0',
  makeRequest: fetchCall
});
const listPostFields = ['id', 'title', 'slug', 'description', 'visibility', 'feature_image', 'primary_author', 'access', 'featured', 'reading_time', 'excerpt', 'published_at', 'updated_at'];
async function getPosts({
  limit = 'all'
}) {
  return await api.posts.browse({
    limit: limit,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }).catch(err => {
    console.error(err);
  });
}
async function getPostsByTag(slug, {
  limit = 'all'
}) {
  return await api.posts.browse({
    limit: limit,
    filter: `tag:${slug}`,
    fields: listPostFields,
    include: ['tags', 'authors'],
    order: ['featured DESC', 'published_at DESC']
  }).catch(err => {
    console.error(err);
  });
}
function getSettings() {
  return api.settings.browse().catch(err => {
    if (!err.response) {
      console.error(err);
    } else if (err && err.response && err.response.status >= 500) {
      console.error(err);
    }
  });
}
async function getSection() {
  const tags = await api.tags.browse({
    filter: 'visibility:public',
    limit: 7,
    order: ['featured DESC', 'posts.count DESC']
  }).catch(err => {
    if (!err.response) {
      console.error(err);
    } else if (err && err.response && err.response.status >= 500) {
      console.error(err);
    }
  });
  if (!tags) return null;
  return await Promise.all(tags.map(async tag => {
    const posts = await getPostsByTag(tag.slug, {
      limit: 3
    });
    return Object.assign(tag, {
      posts: posts
    });
  }));
}

const isoDatetime = timeData => {
  if (!timeData) {
    return undefined;
  }
  if (typeof timeData === 'string') return moment(timeData).toISOString();
  if (!Number.isNaN(timeData)) return moment.unix(timeData).toISOString();
  return timeData;
};

const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
const getMetadata = (settings, headProps = {}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.url;
  const defaultProps = {
    title: settings.meta_title || settings.title || 'Local Insider | Travel like a local',
    description: settings.meta_description || settings.description || 'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    url: settings.url,
    siteName: settings.siteName
  };
  const metaProps = {
    ...defaultProps,
    ...headProps,
    ogTitle: headProps.og_title || headProps.title || settings.og_title || defaultProps.title,
    ogDescription: headProps.og_description || headProps.description,
    ogImage: headProps.og_image || headProps.photo || settings.og_image || defaultProps.photo,
    twitterTitle: headProps.twitterTitle || headProps.title || settings.title,
    twitterImage: headProps.twitterImage || headProps.photo || settings.og_image || 'https://localinsider.storage.googleapis.com/2022/09/LOGO-4.png',
    twitterDescription: headProps.twitterDescription || headProps.description || 'We feature travel stories and lifestyles of real locals for those who want to explore destinations through the lens of people who live there.',
    ogUrl: headProps.og_url || headProps.canonical || defaultProps.url,
    canonical: headProps.canonical
  };
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
const getPostMetadata = ({
  post,
  settings
}) => {
  if (!post) {
    return getMetadata(settings);
  }
  const headProps = {
    title: settings.title ? `${post.title} | ${settings.title}` : post.title,
    description: post.custom_excerpt || post.excerpt,
    canonical: `/post/${post.slug}/${post.id}`
  };
  const openGraph = {
    title: post.title,
    description: headProps.description,
    images: [post.feature_image],
    type: 'article',
    publishedTime: isoDatetime(post.published_at),
    modifiedTime: isoDatetime(post.updated_at)
  };
  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  };
};
const getPageMetadata = ({
  page,
  settings
}) => {
  const headProps = {
    title: settings.title ? `${page.title} | ${settings.title}` : page.title,
    description: page.custom_excerpt || page.excerpt,
    canonical: `/page/${page.slug}`
  };
  const openGraph = {
    title: page.title,
    description: headProps.description,
    images: [page.feature_image],
    type: 'article',
    publishedTime: isoDatetime(page.published_at),
    modifiedTime: isoDatetime(page.updated_at)
  };
  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  };
};
const getTagMetadata = ({
  tag,
  settings
}) => {
  const headProps = {
    title: settings.title ? `${tag.title} | ${settings.title}` : tag.title,
    description: tag.custom_excerpt || tag.excerpt,
    canonical: `/tag/${tag.slug}`
  };
  const openGraph = {
    title: tag.title,
    description: headProps.description,
    images: [tag.feature_image],
    type: 'article',
    publishedTime: isoDatetime(tag.published_at),
    modifiedTime: isoDatetime(tag.updated_at)
  };
  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  };
};
const getAuthorMetadata = ({
  author,
  settings
}) => {
  const headProps = {
    title: settings.title ? `${author.name} | ${settings.title}` : author.name,
    description: author.bio,
    canonical: `/author/${author.slug}`
  };
  const openGraph = {
    title: author.name,
    description: headProps.description,
    images: [author.feature_image],
    type: 'article',
    publishedTime: isoDatetime(author.published_at),
    modifiedTime: isoDatetime(author.updated_at)
  };
  return {
    ...getMetadata(settings, headProps),
    openGraph: openGraph
  };
};

var styles = {"test":"_3ybTi"};

const ExampleComponent = ({
  text
}) => {
  return /*#__PURE__*/React$1.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { ExampleComponent, component$1 as Footer, component$2 as Header, component as PostCard, getAuthorMetadata, getIMGXUrl, getMetadata, getPageMetadata, getPostMetadata, getPosts, getSection, getSettings, getTagMetadata };
//# sourceMappingURL=index.modern.js.map