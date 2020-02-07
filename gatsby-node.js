const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    query GET_POSTS {
        wpgraphql {
            posts {
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
                            uri
                        }
                    }
                }
            }
        }
    }
  `).then(result => {
    result.data.wpgraphql.posts.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-template.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
          databaseId: node.databaseId,
        },
      })
    })
  })
}