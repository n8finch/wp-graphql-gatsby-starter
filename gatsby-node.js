const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /**
   * Create Blog Posts
   */
  const postResults = await graphql(`
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
        }
    }
  `);
  
  postResults.data.wpgraphql.posts.edges.forEach(({ node }) => {
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
  });

  /**
   * Create Pages
   */
  const pageResults = await graphql(`
    query GET_PAGES {
      wpgraphql {
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
  `);
  
  pageResults.data.wpgraphql.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/page-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.slug,
        databaseId: node.databaseId,
      },
    })
  });


  /**
   * Create Category Pages
   */
  const categoryPageResults = await graphql(`
    query GET_CATEGORY_PAGES {
      wpgraphql {
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
  `);
  
  categoryPageResults.data.wpgraphql.categories.edges.forEach(({ node }) => {
    createPage({
      path: `/category/${node.slug}`,
      component: path.resolve(`./src/templates/category-page-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.slug,
        databaseId: node.databaseId,
        name: node.name
      },
    })
  });

  /**
   * Create Tags Pages
   */
  const tagPageResults = await graphql(`
    query GET_CATEGORY_PAGES {
      wpgraphql {
        tags(first: 1000) {
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
  `);
  
  tagPageResults.data.wpgraphql.tags.edges.forEach(({ node }) => {
    createPage({
      path: `/tag/${node.slug}`,
      component: path.resolve(`./src/templates/tag-page-template.js`),
      context: {
        // This is the $slug variable
        // passed to blog-post.js
        slug: node.slug,
        databaseId: node.databaseId,
        name: node.name
      },
    })
  });

}