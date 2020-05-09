const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

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

// Create Cached Image files
// https://thoughtsandstuff.com/gatsby-with-wordpress-caching-downloaded-media-images-to-reduce-build-time/
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  getNode,
  store,
  reporter
}) => {
  const { createNode, touchNode } = actions;

  // Add all media libary images so they can be queried by
  // childImageSharp
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source, args, context, info) {
          if (source.sourceUrl) {
            let fileNodeID;
            let fileNode;
            let sourceModified;

            // Set the file cacheID, get it (if it has already been set)
            const mediaDataCacheKey = `wordpress-media-${source.mediaItemId}`;
            const cacheMediaData = await cache.get(mediaDataCacheKey);

            if (source.modified) {
              sourceModified = source.modified;
            }

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload
            if (cacheMediaData && sourceModified === cacheMediaData.modified) {
              fileNode = getNode(cacheMediaData.fileNodeID);

              // check if node still exists in cache
              // it could be removed if image was made private
              if (fileNode) {
                fileNodeID = cacheMediaData.fileNodeID;
                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                touchNode({
                  nodeId: fileNodeID
                });
              }
            }

            // If we don't have cached data, download the file
            if (!fileNodeID) {
              try {
                // Get the filenode
                fileNode = await createRemoteFileNode({
                  url: source.sourceUrl,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter
                });

                if (fileNode) {
                  fileNodeID = fileNode.id;

                  await cache.set(mediaDataCacheKey, {
                    fileNodeID,
                    modified: sourceModified
                  });
                }
              } catch (e) {
                // Ignore
                console.log(e);
                return null;
              }
            }

            if (fileNode) {
              return fileNode;
            }
          }
          return null;
        }
      }
    }
  });
}

// Get and Cache images from WP
// https://dev.to/nevernull/gatsby-with-wpgraphql-acf-and-gatbsy-image-72m
// exports.createResolvers = async (
//   {
//     actions,
//     cache,
//     createNodeId,
//     createResolvers,
//     store,
//     reporter,
//   },
// ) => {
//   const { createNode } = actions

//   await createResolvers({
//     WPGraphQL_MediaItem: {
//       imageFile: {
//         type: "File",
//         async resolve(source) {

//           let sourceUrl = source.sourceUrl;

//           if (source.mediaItemUrl !== undefined) {
//             sourceUrl = source.mediaItemUrl;
//           }

//           return await createRemoteFileNode({
//             url: encodeURI(sourceUrl),
//             store,
//             cache,
//             createNode,
//             createNodeId,
//             reporter,
//           })
//         },
//       },
//     },
//   })
// }