import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
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
      <br/>
      <hr/>
      <br/>
    <h2>Pages</h2>
      {data.wpgraphql.pages.edges.map(({ node }) => (
        <div key={node.slug}>
          <Link to={node.slug}>
          <div dangerouslySetInnerHTML={{ __html: node.title }} />
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
      <br/>
      <hr/>
      <br/>
    <h2>Categories</h2>
      {data.wpgraphql.categories.edges.map(({ node }) => (
        <div key={node.slug}>
          <Link to={`/category/${node.slug}`}>
          <div dangerouslySetInnerHTML={{ __html: node.name }} />
          </Link>
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
        categories(first: 1000) {
          edges {
            node {
              databaseId
              name
              slug
            }
          }
        }
    }
  }
`