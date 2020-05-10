import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";

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
    {data.wpgraphql.post.featuredImage && (
      <img
        src={data.wpgraphql.post.featuredImage.mediaItemUrl}
        alt={data.wpgraphql.post.title}
      />
    )}

    <h1 dangerouslySetInnerHTML={{ __html: data.wpgraphql.post.title }} />

    <div dangerouslySetInnerHTML={{ __html: data.wpgraphql.post.content }} />

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
