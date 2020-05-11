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

  buttonList = [
    ...new Set([].concat.apply([], initialState.categories)),
  ].sort();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryTerms, setcategoryTerms] = useState([]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategory = event => {
    if ("clearTerms" !== event.target.value) {
      setcategoryTerms(categoryTerms.concat(event.target.value));
      setSearchTerm("");
      return;
    }
    setSearchTerm("");
    setcategoryTerms([]);
  };

  useEffect(() => {
    const results = initialState.posts.filter(post => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    let results = initialState.posts;
    if (0 !== categoryTerms.length) {
      results = initialState.posts.filter(post => {
        const postCategories = post.categories.edges.map(({ node }) => {
          return -1 < categoryTerms.indexOf(node.name) ? true : false; //return if the category name is in the terms to search for.
        });
        return -1 < postCategories.indexOf(true) ? true : false; // return this post of any of the categories are true.
      });
    }
    setSearchResults(results);
  }, [categoryTerms]);

  return (
    <>
      <p>Search posts by title or category...</p>
      <input
        type="text"
        placeholder="Type to fileter posts by title"
        onChange={handleSearch}
        style={{ minWidth: "300px" }}
        value={searchTerm}
      />
      <br />
      <br />
      <div className="category-button-list">
        {buttonList.map(category => {
          return (
            <button
              key={category}
              className={
                "btn btn-primary " + -1 < categoryTerms.indexOf(category)
                  ? "btn btn-primary active"
                  : "btn btn-primary inactive"
              }
              value={category}
              onClick={handleCategory}
            >
              {category}
            </button>
          );
        })}
        <button
          className="btn btn-secondary"
          value="clearTerms"
          onClick={handleCategory}
        >
          Clear All
        </button>
      </div>

      <br />
      <hr />
      <br />
      {searchResults.map(post => (
        <BlogItem key={post.slug}>{post}</BlogItem>
      ))}
    </>
  );
};

export default BlogList;
