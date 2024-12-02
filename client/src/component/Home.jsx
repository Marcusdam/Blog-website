import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, fetchRecentPosts } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error, recentPosts } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchRecentPosts());
  }, [dispatch]);

  const handlePostClick = (postId, isAuthor) => {
    navigate(`/posts/${postId}`, { state: { isAuthor } });
  };

  return (
    <div className="px-8 mt-28">
   
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {loading ? (
              <p>Loading posts...</p>
            ) : error ? (
              <p>Error loading posts: {error}</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id, post.author?.isAuthor)}
                  className="cursor-pointer mb-4 p-4 border shadow-lg rounded-md hover:bg-gray-100 transition-all"
                >
                  <div>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-48 sm:h-60 object-cover rounded-md"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  {post.author && (
                    <div className="p-2 flex items-center">
                      {post.author.image && (
                        <img
                          src={post.author.image}
                          alt="Author"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div className="text-gray-500 pl-2">
                        <p>
                          <b>Author:</b> {post.author.username}
                        </p>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <h2 className="font-bold text-xl  ">{post.title}</h2>
                  <p className="text-justify">
                    {post.content
                      ? post.content.length > 100
                        ? `${post.content.substring(0, 100)}.... More`
                        : post.content
                      : "No content available"}
                  </p>
                </div>
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>

        
        <div className="bg-gray-100 p-4 rounded-md w-full md:col-span-3">
          <h1 className="font-bold text-lg mb-2">Recent Posts</h1>
          <div className="flex flex-col gap-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id, post.author?.isAuthor)}
                  className="cursor-pointer mb-4 p-2 hover:bg-gray-200 rounded-md w-full"
                >
                  <div>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-32 sm:h-48 object-cover rounded-md"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="text-sm text-gray-700">
                    {post.content
                      ? post.content.length > 80
                        ? `${post.content.substring(0, 80)}... More`
                        : post.content
                      : "No content available"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No recent posts found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
