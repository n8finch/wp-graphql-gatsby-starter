import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const initialState = {
  categories: "",
  posts: "",
};

const BlogItem = ({ children }) => {
  return (
    <div className="blog-archive-container" key={children.slug}>
      {null !== children.featuredImage && (
        <div className="blog-archive-image-container">
          <Link to={`/${children.slug}`}>
            <Img
              fixed={children.featuredImage.imageFile.childImageSharp.fixed}
              alt={children.title}
            />
          </Link>
        </div>
      )}
      <div>
        <Link to={`/${children.slug}`}>
          <h3 dangerouslySetInnerHTML={{ __html: children.title }} />
        </Link>
        <div dangerouslySetInnerHTML={{ __html: children.excerpt }} />
      </div>
    </div>
  );
};

const BlogList = props => {
  let buttonList = [];
  initialState.posts = props.children.map(({ node }) => {
    return node;
  });
  initialState.categories = props.children.map(({ node }) => {
    return node.categories.edges.map(({ node }) => {
      return node.name;
    });
  });

  console.log(initialState.categories);

  buttonList = [...new Set(initialState.categories.flat(2))];

  console.log(buttonList);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryTerms, setcategoryTerms] = useState([]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategory = event => {
    console.log(event.target.value);
    // setcategoryTerms(event.target.value);
  };

  useEffect(() => {
    const results = initialState.posts.filter(post => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <>
      <div className="category-button-list">
        {buttonList.map(category => {
          return (
            <button key={category} value={category} onClick={handleCategory}>
              {category}
            </button>
          );
        })}
      </div>
      <br />
      <input
        type="text"
        placeholder="Type to fileter posts by title"
        onChange={handleSearch}
        style={{ minWidth: "300px" }}
        value={searchTerm}
      />
      <br />
      <br />
      {searchResults.map(post => (
        <BlogItem key={post.slug}>{post}</BlogItem>
      ))}
    </>
  );
};

export default BlogList;
