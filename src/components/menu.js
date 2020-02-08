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
                        childItems {
                            edges {
                            node {
                                label
                                url
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
         {data.wpgraphql.menuItems.edges.map(({ node }) => (
            <div key={node.id}>
                {('#' !== node.url) ? (
                    <Link to={`${node.url}`}>{node.label}</Link>
                ) : (
                    <div>{node.label}</div>
                )}
                {(node.childItems) && (
                    <ul>
                    {node.childItems.edges.map(({ node }) => (
                        <li key={node.id}>
                            <Link to={`${node.url}`}>{node.label}</Link>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        ))}
      </nav>
    )}
  />
)