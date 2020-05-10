import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Avatar from "../components/image";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Home"
      description="I love solving problems, learning new things, and helping people. By day, I'm VP of Development at The Digital Ring, a full-service digital marketing agency in Madison, Wisconsin 🧀."
      image=""
    />
    <h1>
      Hey y'all!
      <span role="img" aria-label="waving hello">
        👋
      </span>
    </h1>
    <div className="introduction box-wrapper-first">
      <div className="box">
        <p>
          Fill out an intro to yourself here... Put your picture on the right!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="box">
        <Avatar />
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div className="box-wrapper-first">
      <div className="box box-posts">
        <h2>
          Latest Posts{" "}
          <span role="img" aria-label="writing hand">
            ✍️
          </span>
        </h2>
        {data.wpgraphql.blogs.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link className="blog-link" to={`/${node.slug}`}>
              {null !== node.featuredImage && (
                <Img
                  className="blog-image"
                  fixed={node.featuredImage.imageFile.childImageSharp.fixed}
                  alt={node.title}
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: node.title }} />
            </Link>
          </div>
        ))}
        <br />
        <Link to={`/blog`}>See all Blog Posts...</Link>
      </div>
      <div className="box box-talks">
        <h2>
          Un-Cat
          <span role="img" aria-label="uncategorized">
            🙀
          </span>
        </h2>
        <ul>
          {data.wpgraphql.uncategorized.edges.map(({ node }) => (
            <li key={node.slug}>
              <Link
                to={`/${node.slug}`}
                dangerouslySetInnerHTML={{ __html: node.title }}
              ></Link>
            </li>
          ))}
        </ul>
        <br />
        <Link to={`/category/uncategorized`}>See all uncategorized...</Link>
      </div>
    </div>

    <br />
    <br />
    <hr />
    <br />
    <br />

    <h2>Categories</h2>
    {data.wpgraphql.categories.edges.map(({ node }) => (
      <div key={node.slug}>
        <Link to={`/category/${node.slug}`}>
          <div dangerouslySetInnerHTML={{ __html: node.name }} />
        </Link>
      </div>
    ))}
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query GET_POSTS {
    wpgraphql {
      blogs: posts(first: 6, after: null) {
        edges {
          node {
            databaseId
            slug
            title
            date
            excerpt
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
                  fixed(width: 50) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
      uncategorized: posts(
        first: 6
        after: null
        where: { categoryName: "uncategorized" }
      ) {
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
`;
