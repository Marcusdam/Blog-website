import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostBycategory } from "../redux/postSlice";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams(); 
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchPostBycategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const handlePostClick = (postId, isAuthor) => {
    navigate(`/posts/${postId}`, { state: { isAuthor } });
  };

  return (
    <div className="container max-w-[1240px] mx-auto px-4 space-y-20 sm:px-8 mt-28 text-justify">
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error loading posts: {error}</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id, post.author?.isAuthor)}
            className="cursor-pointer "
          >
            <div>
              {post.image ? (
                <img src={post.image} alt="Post" className="w-full" />
              ) : (
                <p>No image available</p>
              )}
            </div>
            {post.author && (
              <div className="p-2 flex items-center ">
                {post.author.image && (
                  <img
                    src={post.author.image}
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="text-gray-500 pl-2">
                  <p>
                    {" "}
                    <b>Author:</b> {post.author.username}
                  </p>
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            )}
            <h2 className="font-bold text-3xl pt-4">{post.title}</h2>
            <p className="pt-4 text-justify">{post.content}</p>
            
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Post;
