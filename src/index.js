import React from 'react'
import PostCard from './components/cards/PostCard'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import { getPosts, getSection, getSettings } from './lib/ghost/api'
import { getIMGXUrl } from './lib/image/optimizer'
import {
  getAuthorMetadata,
  getMetadata,
  getPageMetadata,
  getPostMetadata,
  getTagMetadata
} from './lib/metadata'
import styles from './styles.module.css'

const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export {
  ExampleComponent,
  Footer,
  Header,
  PostCard,
  getAuthorMetadata,
  getIMGXUrl,
  getMetadata,
  getPageMetadata,
  getPostMetadata,
  getPosts,
  getSection,
  getSettings,
  getTagMetadata
}
