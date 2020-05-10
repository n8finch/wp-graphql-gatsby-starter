import PropTypes from "prop-types";
import React from "react";

import ThemeContext from "../context/ThemeContext";

const Footer = ({ siteTitle, siteDescription }) => (
  <ThemeContext.Consumer>
    {theme => (
      <footer className="container light">
        <br />
        <hr />
        <br />© {new Date().getFullYear()}, A labor of ❤️, built on
        {` `}
        <a
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
        {` `}by Nate Finch
      </footer>
    )}
  </ThemeContext.Consumer>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
};

export default Footer;
