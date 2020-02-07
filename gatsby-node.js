const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    query GET_POSTS {
        wpgraphql {
            posts {
                edges {
                node {
                    title
                    slug
                    content(format: RENDERED)
                    date
                    featuredImage {
                        altText
                        link
                        uri
                    }
                    author {
                    name
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
        },
      })
    })
  })
}