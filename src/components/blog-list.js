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
  initialState.posts = props.children.map(({ node }) => {
    return node;
  });
  initialState.categories = props.children.map(({ node }) => {
    return node.categories.edges.map(node => {
      return node;
    });
  });

  console.log(initialState.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = initialState.posts.filter(post => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
  }, [searchTerm]);

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
      {searchResults.map(post => (
        <BlogItem key={post.slug}>{post}</BlogItem>
      ))}
    </>
  );
};

export default BlogList;
