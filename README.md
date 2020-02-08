# N8finch WP Gatsby Starter

Working out my own custom Gatsby theme for my site.

## Clone and Configure Your Gatsby Starter

1. Clone this repo, `cd` into it, and then `npm install` or `yarn`.
2. Go to `gatsby-config.js` and modify this line to be your URL: `url: `https://dev-n8finch.pantheonsite.io/graphql`,`

## Setup on You WordPress Site and in the Starter

1. This starter should work with both the TwentyNineteen and TwentyTwenty themes.
2. You'll need to make sure that you have the Menu you want added to the `Social Menu` option in the `Apperance>>Menus>>Manage Locations` area of your WordPress Admin. It's labeled `Social Links Menu` in TwentyNineteen and `Social Menu` in Twenty Twenty.
3. You'll need to install the WP GraphQL plugin from Github (it's not on the WordPress.org plugin repository). You can get the latest version as a zip [here](https://github.com/wp-graphql/wp-graphql/archive/master.zip) which will allow you to upload it directly to your WordPress site, or clone it from the [respository](https://github.com/wp-graphql/wp-graphql).
4. I would also recommend installing the WPGraphiql plugin, which you can get from the Github repo [here](https://github.com/wp-graphql/wp-graphiql).




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

