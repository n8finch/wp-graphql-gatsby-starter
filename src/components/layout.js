import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import ThemeContext from "../context/ThemeContext";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <ThemeContext.Consumer>
        {theme => (
          <div className={theme.dark ? "dark" : "light"}>
            <Header
              siteTitle={data.site.siteMetadata.title}
              siteDescription={data.site.siteMetadata.description}
            />
            <div className="container">{children}</div>
            <Footer />
          </div>
        )}
      </ThemeContext.Consumer>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
