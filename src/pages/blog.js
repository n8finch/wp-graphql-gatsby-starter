import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import BlogList from "../components/blog-list";
import SEO from "../components/seo";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Blog Archive "
      description="A list of all the blogs..."
      image=""
    />

    <h1>Blog Archive</h1>
    <p>A list of all the blogs...</p>

    <h2>Posts</h2>

    <BlogList>{data.wpgraphql.posts.edges}</BlogList>
    {/* {data.wpgraphql.posts.edges.map(({ node }) => (
      <div className="blog-archive-container" key={node.slug}>
        {null !== node.featuredImage && (
          <div className="blog-archive-image-container">
            <Link to={`/${node.slug}`}>
              <Img
                fixed={node.featuredImage.imageFile.childImageSharp.fixed}
                alt={node.title}
              />
            </Link>
          </div>
        )}
        <div>
          <Link to={`/${node.slug}`}>
            <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      </div>
    ))} */}
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query GET_BLOG_POSTS {
    wpgraphql {
      posts(first: 10000, after: null) {
        edges {
          node {
            databaseId
            slug
            title
            date
            excerpt
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            content(format: RENDERED)
            featuredImage {
              altText
              title(format: RENDERED)
              mediaItemUrl
              slug
              sourceUrl
              mediaItemId
              modified
              imageFile {
                childImageSharp {
                  fixed(width: 250) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
