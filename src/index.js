import PostCard from './components/cards/PostCard'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import FeatureIcon from './components/svg/FeatureIcon'
import ProfileIcon from './components/svg/ProfileIcon'
import PageTemplate from './components/templates/page'
import PostTemplate from './components/templates/post'
import * as ghostApi from './lib/ghost/api'
import { getIMGXUrl } from './lib/image/optimizer'
import {
  getAuthorMetadata,
  getMetadata,
  getPageMetadata,
  getPostMetadata,
  getTagMetadata
} from './lib/metadata'

import './styles/localcasperv5/screen.css'

export {
  FeatureIcon,
  Footer,
  Header,
  PageTemplate,
  PostCard,
  PostTemplate,
  ProfileIcon,
  getAuthorMetadata,
  getIMGXUrl,
  getMetadata,
  getPageMetadata,
  getPostMetadata,
  getTagMetadata,
  ghostApi
}
