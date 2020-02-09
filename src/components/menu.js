import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
        query MenuQuery {
            wpgraphql {
                menuItems(where: {location: SOCIAL}) {
                edges {
                    node {
                    label
                    url
                    connectedObject {
                        ... on WPGraphQL_Post {
                        slug
                        title
                        }
                        ... on WPGraphQL_MenuItem {
                        title
                        }
                        ... on WPGraphQL_Tag {
                        slug
                        name
                        }
                        ... on WPGraphQL_Category {
                        slug
                        name
                        }
                        ... on WPGraphQL_Page {
                        slug
                        title
                        }
                    }
                    childItems {
                        edges {
                        node {
                            label
                            url
                            connectedObject {
                            ... on WPGraphQL_Post {
                                slug
                                title
                            }
                            ... on WPGraphQL_MenuItem {
                                title
                            }
                            ... on WPGraphQL_Tag {
                                slug
                                name
                            }
                            ... on WPGraphQL_Category {
                                slug
                                name
                            }
                            ... on WPGraphQL_Page {
                                slug
                                title
                            }
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        }
    `}

    render={data => (
      <nav>
        <ul>
        {data.wpgraphql.menuItems.edges.map(({ node }) => (
            <li key={node.id}>
                {('#' !== node.url) ? (
                    <Link to={`/${node.connectedObject.slug}`}>{node.label}</Link>
                ) : (
                    <div>{node.label}</div>
                )}
                {(node.childItems.edges.length > 0) && (
                    <ul className="sub-nav">
                        {node.childItems.edges.map(({ node }) => (
                            <li key={node.id}>
                                <Link to={`/${node.connectedObject.slug}`}>{node.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ))}
        </ul>
      </nav>
    )}
  />
)