import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import ThemeContext from '../context/ThemeContext'
import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeContext.Consumer>
        {theme => (
          <div className={theme.dark ? 'dark' : 'light'}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 0,
              }}
            >
              {children}
              <footer>
                © {new Date().getFullYear()}, Starter built with
                {` `}
                <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">Gatsby</a>
                {` `}by{` `}
                <a href="https://n8finch.com" target="_blank" rel="noopener noreferrer">Nate Finch</a>
              </footer>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout