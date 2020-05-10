import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = ({ data }) => (
  <Layout>
    <SEO
      title={data.wpgraphql.post.title}
      description={data.wpgraphql.post.excerpt}
      image={
        data.wpgraphql.post.featuredImage &&
        `https://n8finch.com${data.wpgraphql.post.featuredImage.imageFile.childImageSharp.fluid.src}`
      }
    />

    <div className="blog-template">
      {data.wpgraphql.post.featuredImage && (
        <Img
          fluid={
            data.wpgraphql.post.featuredImage.imageFile.childImageSharp.fluid
          }
          alt={data.wpgraphql.post.title}
        />
      )}

      <h1 dangerouslySetInnerHTML={{ __html: data.wpgraphql.post.title }} />

      <div
        className="content-container"
        dangerouslySetInnerHTML={{ __html: data.wpgraphql.post.content }}
      />
    </div>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;

export const query = graphql`
  query($databaseId: ID!) {
    wpgraphql {
      post(id: $databaseId, idType: DATABASE_ID) {
        title
        date
        content(format: RENDERED)
        categories {
          edges {
            node {
              name
            }
          }
        }
        excerpt(format: RENDERED)
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
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
