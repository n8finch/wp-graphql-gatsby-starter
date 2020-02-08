# N8finch WP Gatsby Starter

Working out my own custom Gatsby theme for my site.

## Setup on You WordPress Site and in the Starter

1. This starter should work with both the TwentyNineteen and TwentyTwenty themes.
2. You'll need to make sure that you have the Menu you want added to the `Social Menu` option in the `Apperance>>Menus>>Manage Locations` area of your WordPress Admin. It's labeled `Social Links Menu` in TwentyNineteen and `Social Menu` in Twenty Twenty.


If you need to edit ID or the depth of the menu, you can do so in the `src/components/menu.js` file:

```js
{
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
```


## The ToDo List

- ✅ posts queried and displayed
- ✅ pages queried and displayed
- ✅ categories and tags queried and displayed
- ___ get the Primary menu (by slug: `primary`)
- ✅ implement light/dark mode, from [Using React Context API with Gatsby by Muhammad Muhsin](https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/)
- arrange and style like tania.dev and adamwathan.me


## Stretch Goals

- ___ Featured images done with Gatsby Image
- ___ internal links are replaced with Gatsby `Link` (`gatsby-plugin-catch-links` doesn't seem to work?)

