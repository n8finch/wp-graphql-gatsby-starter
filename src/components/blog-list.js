import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

const initialState = {
  categories: "",
  posts: "",
};

const BlogItem = {
  //
};

const BlogList = props => {
  console.log(props);

  console.log(initialState);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  //   useEffect(() => {
  //     const results = people.filter(person =>
  //       person.toLowerCase().includes(searchTerm)
  //     )
  //     setSearchResults(results)
  //   }, [searchTerm])

  return (
    <>
      <input
        type="text"
        placeholder="Type to fileter posts by title"
        onChange={handleSearch}
        style={{ minWidth: "300px" }}
        value={searchTerm}
      />
      <br />
      <br />
      {props.children.map(({ node }) => (
        <div className="blog-archive-container" key={node.slug}>
          {null !== node.featuredImage && (
            <div className="blog-archive-image-container">
              <Link to={`/${node.slug}`}>
                <Img
                  fixed={node.featuredImage.imageFile.childImageSharp.fixed}
                  alt={node.title}
                />
              </Link>
            </div>
          )}
          <div>
            <Link to={`/${node.slug}`}>
              <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogList;
