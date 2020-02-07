import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" description="" />
    <h1>My Blog</h1>
    <h2>Posts</h2>
      {data.wpgraphql.posts.edges.map(({ node }) => (
        <div key={node.slug}>
          <Link to={node.slug}>
          <div dangerouslySetInnerHTML={{ __html: node.title }} />
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    <h2>Pages</h2>
      {data.wpgraphql.pages.edges.map(({ node }) => (
        <div key={node.slug}>
          <Link to={node.slug}>
          <div dangerouslySetInnerHTML={{ __html: node.title }} />
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query GET_POSTS {
    wpgraphql {
        posts(first: 1000, after: null) {
            edges {
                node {
                    databaseId
                    slug
                    title
                    date
                    content(format: RENDERED)
                    featuredImage {
                        altText
                        link
                        mediaItemUrl
                        uri
                    }
                }
            }
        }
        pages(first: 1000, after: null) {
            edges {
                node {
                    databaseId
                    slug
                    title
                    date
                    content(format: RENDERED)
                    featuredImage {
                        altText
                        link
                        mediaItemUrl
                        uri
                    }
                }
            }
        }
    }
  }
`